from sqlalchemy import Column, Integer, String, Date, DateTime, Text, ForeignKey, ARRAY #ForeignKey будет ссылаться на поле из другой таблицы 
from sqlalchemy.orm import relationship # для создания связи между полями 
from database import Base # все наше подключение которое которое на основе наших моделей создает таблицы в БД

#To-Do
class User(Base):
    __tablename__ = "User"

    id = Column(Integer, primary_key=True, index=True)# index=True - поиск по этому столбцу
    user_id = Column(Integer, index=True)
    user_fullname = Column(String, index=True)
    user_group = Column(String, index=True)

class GroupInfo(Base):
    __tablename__ = "GroupInfo"

    id = Column(Integer, primary_key=True, index=True)# index=True - поиск по этому столбцу
    group_number = Column(String, index=True)
    faculty = Column(String, index=True)
    department = Column(String, index=True)
    profile = Column(String, index=True)
    specialty = Column(String, index=True)

class News(Base):
    __tablename__ = "News"

    id = Column(Integer, primary_key=True, index=True)# index=True - поиск по этому столбцу\
    scrap_id = Column(Integer, index=True)
    image_path = Column(String, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    date = Column(Date, index=True)

class Events(Base):
    __tablename__ = "Events"

    id = Column(Integer, primary_key=True, index=True)# index=True - поиск по этому столбцу
    image_path = Column(String, index=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    date = Column(DateTime, index=True)
# Этот файл описывает каждую табличку для БД
# на основе этого файла на основе этих классов 
# будут созданы разные таблицы в БД