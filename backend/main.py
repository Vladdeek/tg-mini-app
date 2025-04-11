import random
import ast
import requests
from fastapi import FastAPI, HTTPException, Path, Query, Body, Depends
from typing import Optional, List, Dict, Annotated
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import func, desc
from passlib.context import CryptContext # библиотека для ХЕША паролей 

#импорт наших классов
from database import engine, session_local
from models import Base, Certificate, User, GroupInfo, News, Events, Schedule
from schemas import UserCreate, User as UserSchema, GroupInfoBase, GroupInfo as GroupInfoSchema, NewsCreate, News as NewsSchema, EventsCreate, Events as EventsSchema, CertificateCreate, Certificate as CertificateSchema, Schedule as ScheduleSchema


app = FastAPI()

# Импортируем CORSMiddleware для разрешения кросс-доменных запросов
# CORS (Cross-Origin Resource Sharing) нужно, чтобы фронтенд с другого домена/порта мог отправлять запросы на наш сервер
from fastapi.middleware.cors import CORSMiddleware

# Разрешаем все источники для теста
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],  # Разрешаем все методы (GET, POST, и т.д.)
    allow_headers=["*"],  # Разрешаем все заголовки
)

Base.metadata.create_all(bind=engine)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto") #Настройка контекста для bcrypt


# функция создает сессию для подключения к ДБ
def get_db():
    db = session_local()
    try:
        yield db 
    finally:
        db.close()

@app.post("/reg_user/", response_model=UserSchema)  
async def create_user(user: UserCreate, db: Session = Depends(get_db)) -> UserSchema:
    db_user = User(
        user_id=user.user_id,
        user_fullname=user.user_fullname,
        user_group=user.user_group,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user  

@app.get("/user/{userId}")
async def check_user(userId: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == userId).first()
    if user:
        return user
    raise HTTPException(status_code=404, detail="Пользователь не найден")

@app.get("/groupinfo/{group_num}")
async def check_groupinfo(group_num: str, db: Session = Depends(get_db)):
    groupinfo = db.query(GroupInfo).filter(GroupInfo.group_number == group_num).first()
    if groupinfo:
        return groupinfo
    raise HTTPException(status_code=404, detail="такой группы не существует")


@app.get("/auth/{userId}")
async def check_user(userId: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == userId).first()
    if user:
        return {"exists": True}
    raise HTTPException(status_code=404, detail="Пользователь не найден")

# Вывод всех данных
@app.get("/news/", response_model=List[NewsSchema])
async def get_news(db: Session = Depends(get_db)):
    return db.query(News).order_by(desc(News.date)).all()


@app.get("/news/{news_id}", response_model=NewsSchema)
async def get_news(news_id: int, db: Session = Depends(get_db)):
    news = db.query(News).filter(News.id == news_id).first()
    if not news:
        raise HTTPException(status_code=404, detail="Новость не найдена")
    return news

# Вывод всех данных
@app.get("/events/", response_model=List[EventsSchema])
async def events(db: Session = Depends(get_db)):
    return db.query(Events).all()

@app.get("/events/{event_id}")
async def check_event(event_id: str, db: Session = Depends(get_db)):
    event = db.query(Events).filter(Events.id == event_id).first()
    if event:
        return event
    raise HTTPException(status_code=404, detail="такого мероприятия нет")

@app.post("/news/", response_model=NewsSchema)  
async def create_news(news: NewsCreate, db: Session = Depends(get_db)) -> NewsSchema:
    db_news = News(
        scrap_id=news.scrap_id,
        title=news.title,
        description=news.description,
        image_path=news.image_path,
        date=news.date,
    )
    db.add(db_news)
    db.commit()
    db.refresh(db_news)

    return db_news 

@app.post("/event/", response_model=EventsSchema)  
async def event_news(event: EventsCreate, db: Session = Depends(get_db)) -> EventsSchema:
    db_event = Events(
        title=event.title,
        description=event.description,
        image_path=event.image_path,
        date=event.date,
    )
    db.add(db_event)
    db.commit()
    db.refresh(db_event)

    return db_event

@app.get("/certificate/", response_model=List[CertificateSchema])
async def get_certificates(db: Session = Depends(get_db)):
    return db.query(Certificate)\
        .options(
            joinedload(Certificate.user),
            joinedload(Certificate.cer_type)
        ).filter(Certificate.status_id == 1).all()

@app.get("/certificate/{id}", response_model=List[CertificateSchema])
async def get_certificates(id: str, db: Session = Depends(get_db)):
    return db.query(Certificate)\
        .options(
            joinedload(Certificate.user),
            joinedload(Certificate.cer_type)
        ).filter(Certificate.user_id == id).all()

@app.post("/certificate/", response_model=CertificateSchema)
async def create_certificate(certificate: CertificateCreate, db: Session = Depends(get_db)):
    db_certificate = Certificate(
        user_id=certificate.user_id,
        cer_type_id=certificate.cer_type_id,
        status_id=certificate.status_id,
        count=certificate.count,
        description=certificate.description,
        date=certificate.date,
    )
    db.add(db_certificate)
    db.commit()
    db.refresh(db_certificate)
    
    return db_certificate


@app.put("/certificates/{certificate_id}/update-status")
def update_certificate_status(certificate_id: int, db: Session = Depends(get_db)):
    cert = db.query(Certificate).filter(Certificate.id == certificate_id).first()
    
    if not cert:
        raise HTTPException(status_code=404, detail="Certificate not found or status is not 1")

    cert.status_id = 2
    db.commit()
    db.refresh(cert)
    return {"message": "Status updated successfully", "certificate_id": cert.id}

@app.get("/schedule/", response_model=List[ScheduleSchema])
async def get_schedule(db: Session = Depends(get_db)):
    schedules = db.query(Schedule).options(
        joinedload(Schedule.auditoria),
        joinedload(Schedule.teacher),
        joinedload(Schedule.subject),
        joinedload(Schedule.group_info),
        joinedload(Schedule.weekday)
    ).all()
    return schedules

@app.get("/schedule/{group_id}", response_model=List[ScheduleSchema])
async def get_schedule_by_group_number(group_id: str, db: Session = Depends(get_db)):
    schedules = db.query(Schedule).options(
        joinedload(Schedule.auditoria),
        joinedload(Schedule.teacher),
        joinedload(Schedule.subject),
        joinedload(Schedule.group_info),
        joinedload(Schedule.weekday)
    ).filter(Schedule.group_id == group_id).all()

    if not schedules:
        raise HTTPException(status_code=404, detail=f"Schedule not found for group: {group_number}")

    return schedules