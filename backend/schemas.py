from pydantic import BaseModel
from typing import List



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

class GroupInfoCreate(GroupInfoBase):
    pass

class GroupInfo(GroupInfoBase):
    id: int  # Добавляем поле id, которое будет целым числом

    class Config:
        orm_mode = True  



# Здесь описаны различные схемы,
# нужны для описания API
# нужны для описания того что мы будем принимать
# и что мы будем принимать 