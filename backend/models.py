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
    date = Column(DateTime, index=True)

    # Связь с таблицей User
    user = relationship("User", back_populates="certificates")
    # Связь с таблицей CerType
    cer_type = relationship("CerType", back_populates="certificates")
    # Связь с таблицей Status
    status = relationship("Status", back_populates="certificates")


# Этот файл описывает каждую табличку для БД
# на основе этого файла на основе этих классов 
# будут созданы разные таблицы в БД