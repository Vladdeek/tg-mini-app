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

class AuditoriaBase(BaseModel):
    auditoria: str

class Auditoria(AuditoriaBase):
    id: int

    class Config:
        orm_mode = True

class TeacherBase(BaseModel):
    teacher: str

class Teacher(TeacherBase):
    id: int

    class Config:
        orm_mode = True

class SubjectBase(BaseModel):
    subject: str

class Subject(SubjectBase):
    id: int

    class Config:
        orm_mode = True

class WeekDayBase(BaseModel):
    weekday: str

class WeekDay(WeekDayBase):
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

class GroupInfo(GroupInfoBase):
    id: int

    class Config:
        orm_mode = True

class ScheduleBase(BaseModel):
    number: int
    auditoria: Auditoria
    teacher: Teacher
    subject: Subject
    group_info: GroupInfo
    weekday: WeekDay

class Schedule(ScheduleBase):
    id: int

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

class AuditoriaSchema(BaseModel):
    id: int
    auditoria: str

    class Config:
        orm_mode = True

class TeacherSchema(BaseModel):
    id: int
    teacher: str

    class Config:
        orm_mode = True

class SubjectSchema(BaseModel):
    id: int
    subject: str

    class Config:
        orm_mode = True

class GroupInfoSchema(BaseModel):
    id: int
    group_number: str
    faculty: str
    department: str
    profile: str
    specialty: str
    course: int
    name: str

    class Config:
        orm_mode = True

class WeekDaySchema(BaseModel):
    id: int
    weekday: str

    class Config:
        orm_mode = True

class ScheduleSchema(BaseModel):
    id: int
    aud_id: AuditoriaSchema
    teacher_id: TeacherSchema
    sub_id: SubjectSchema
    group_id: GroupInfoSchema
    weekday_id: WeekDaySchema
    number: int

    class Config:
        orm_mode = True