from pydantic import BaseModel
from typing import List, Optional
from datetime import date, datetime



#To-Do
class UserBase(BaseModel):
    user_id: int
    user_fullname: str
    user_group: str

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int

    class Config:
        orm_mode = True

class GroupInfoBase(BaseModel):
    group_number: str  
    faculty: str     
    department: str   
    profile: str      
    specialty: str    
    name: str
    course: int

class GroupInfoCreate(GroupInfoBase):
    pass

class GroupInfo(GroupInfoBase):
    id: int  # Добавляем поле id, которое будет целым числом

    class Config:
        orm_mode = True  

class NewsBase(BaseModel):
   scrap_id: int
   image_path: str
   title: str
   description: str
   date: date

class NewsCreate(NewsBase):
    pass

class News(NewsBase):
    id: int  # Добавляем поле id, которое будет целым числом

    class Config:
        orm_mode = True  


class EventsBase(BaseModel):
   image_path: str
   title: str
   description: str
   date: datetime

class EventsCreate(EventsBase):
    pass

class Events(EventsBase):
    id: int  # Добавляем поле id, которое будет целым числом

    class Config:
        orm_mode = True  

class CerTypeBase(BaseModel):
   CerType: str

class CerTypeCreate(CerTypeBase):
    pass

class CerType(CerTypeBase):
    id: int  # Добавляем поле id, которое будет целым числом

    class Config:
        orm_mode = True  


class StatusBase(BaseModel):
    status_name: str

class StatusCreate(StatusBase):
    pass

class Status(StatusBase):
    id: int  # Добавляем поле id, которое будет целым числом

    class Config:
        orm_mode = True  


class CertificateBase(BaseModel):
   user_id: int
   cer_type_id: int
   status_id: int
   count: int
   description: str
   date: date
   user: Optional[User]
   cer_type: Optional[CerType]

class CertificateCreate(CertificateBase):
    pass

class Certificate(CertificateBase):
    id: int  # Добавляем поле id, которое будет целым числом

    class Config:
        orm_mode = True  

class AuditoriaBase(BaseModel):
    auditoria: str

class AuditoriaCreate(AuditoriaBase):
    pass

class Auditoria(AuditoriaBase):
    id: int  # Добавляем поле id, которое будет целым числом

    class Config:
        orm_mode = True  

class TeacherBase(BaseModel):
    teacher: str

class TeacherCreate(TeacherBase):
    pass

class Teacher(TeacherBase):
    id: int  # Добавляем поле id, которое будет целым числом

    class Config:
        orm_mode = True  

class SubjectBase(BaseModel):
    subject: str

class SubjectCreate(SubjectBase):
    pass

class Subject(SubjectBase):
    id: int  # Добавляем поле id, которое будет целым числом

    class Config:
        orm_mode = True  

class WeekDayBase(BaseModel):
    weekday: str

class WeekDayCreate(WeekDayBase):
    pass

class WeekDay(WeekDayBase):
    id: int  # Добавляем поле id, которое будет целым числом

    class Config:
        orm_mode = True  

class ScheduleBase(BaseModel):
    aud_id: Optional[Auditoria]  # Ссылаемся на объект Auditoria
    teacher_id: Optional[Teacher]  # Ссылаемся на объект Teacher
    sub_id: Optional[Subject]  # Ссылаемся на объект Subject
    group_id: Optional[GroupInfo]  # Ссылаемся на объект GroupInfo
    weekday_id: Optional[WeekDay]  # Ссылаемся на объект WeekDay
    number: int

class ScheduleCreate(ScheduleBase):
    pass

class Schedule(ScheduleBase):
    id: int  # Добавляем поле id, которое будет целым числом

    class Config:
        orm_mode = True



# Здесь описаны различные схемы,
# нужны для описания API
# нужны для описания того что мы будем принимать
# и что мы будем принимать 