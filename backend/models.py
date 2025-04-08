from sqlalchemy import Column, Integer, String, Date, DateTime, Text, ForeignKey, ARRAY #ForeignKey будет ссылаться на поле из другой таблицы 
from sqlalchemy.orm import relationship # для создания связи между полями 
from database import Base # все наше подключение которое которое на основе наших моделей создает таблицы в БД

#To-Do
class User(Base):
    __tablename__ = "User"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    user_fullname = Column(String, index=True)
    user_group = Column(String, index=True)

    certificates = relationship("Certificate", back_populates="user")



class GroupInfo(Base):
    __tablename__ = "GroupInfo"

    id = Column(Integer, primary_key=True, index=True)
    group_number = Column(String, index=True)
    faculty = Column(String, index=True)
    department = Column(String, index=True)
    profile = Column(String, index=True)
    specialty = Column(String, index=True)
    course = Column(Integer, index=True)
    name = Column(String, index=True)

    schedule = relationship("Schedule", back_populates="group_info")



class News(Base):
    __tablename__ = "News"

    id = Column(Integer, primary_key=True, index=True)
    scrap_id = Column(Integer, index=True)
    image_path = Column(String, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    date = Column(Date, index=True)


class Events(Base):
    __tablename__ = "Events"

    id = Column(Integer, primary_key=True, index=True)
    image_path = Column(String, index=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    date = Column(DateTime, index=True)


class Status(Base):
    __tablename__ = "Status"

    id = Column(Integer, primary_key=True, index=True)  
    status_name = Column(String, index=True)  

    certificates = relationship("Certificate", back_populates="status")



class CerType(Base):
    __tablename__ = "CerType"

    id = Column(Integer, primary_key=True, index=True)  
    CerType = Column(String, index=True) 

    certificates = relationship("Certificate", back_populates="cer_type")


class Certificate(Base):
    __tablename__ = "Certificate"

    id = Column(Integer, primary_key=True, index=True) 
    user_id = Column(Integer, ForeignKey('User.id'), nullable=False)  
    cer_type_id = Column(Integer, ForeignKey('CerType.id'), nullable=False) 
    status_id = Column(Integer, ForeignKey('Status.id'), nullable=False)  
    count = Column(Integer)  
    description = Column(String)
    date = Column(DateTime, index=True)

    # Связь с таблицей User
    user = relationship("User", back_populates="certificates")
    # Связь с таблицей CerType
    cer_type = relationship("CerType", back_populates="certificates")
    # Связь с таблицей Status
    status = relationship("Status", back_populates="certificates")


class Auditoria(Base):
    __tablename__ = 'Auditoria'

    id = Column(Integer, primary_key=True, index=True)
    auditoria = Column(String, index=True)

    schedule = relationship("Schedule", back_populates="auditoria")

class Teacher(Base):
    __tablename__ = 'Teacher'

    id = Column(Integer, primary_key=True, index=True)
    teacher = Column(String, index=True)

    schedule = relationship("Schedule", back_populates="teacher")

class Subject(Base):
    __tablename__ = 'Subject'

    id = Column(Integer, primary_key=True, index=True)
    subject = Column(String, index=True)

    schedule = relationship("Schedule", back_populates="subject")

class WeekDay(Base):
    __tablename__ = 'WeekDay'

    id = Column(Integer, primary_key=True, index=True)
    weekday = Column(String, index=True)

    schedule = relationship("Schedule", back_populates="weekday")

class Schedule(Base):
    __tablename__ = 'Schedule'

    id = Column(Integer, primary_key=True, index=True)
    number = Column(Integer)
    aud_id = Column(Integer, ForeignKey('Auditoria.id'), nullable=False)  
    teacher_id = Column(Integer, ForeignKey('Teacher.id'), nullable=False) 
    sub_id = Column(Integer, ForeignKey('Subject.id'), nullable=False)  
    group_id = Column(Integer, ForeignKey('GroupInfo.id'), nullable=False)
    weekday_id = Column(Integer, ForeignKey('WeekDay.id'), nullable=False)  # исправил связь с WeekDay

    auditoria = relationship("Auditoria", back_populates="schedule")
    teacher = relationship("Teacher", back_populates="schedule")
    subject = relationship("Subject", back_populates="schedule")
    group_info = relationship("GroupInfo", back_populates="schedule")  
    weekday = relationship("WeekDay", back_populates="schedule")