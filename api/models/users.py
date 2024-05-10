from pydantic import BaseModel
from datetime import date


class UserIn(BaseModel):
    first_name: str
    last_name: str
    username: str
    password: str
    confirmed_password: str
    date_of_birth: date
    gender: str
    phone: str


class UserOut(UserIn):
    id: int


class UserUpdate(BaseModel):
    password: str
    confirmed_password: str
    phone: str


class UserRequest(BaseModel):
    username: str
    password: str


class UserResponse(BaseModel):
    id: int
    username: str


class UserWithPw(BaseModel):
    id: int
    username: str
    password: str
    first_name: str
    last_name: str
    date_of_birth: date
    gender: str
    phone: str


class UserResponseDetail(BaseModel):
    id: int
    username: str
    first_name: str
    last_name: str
    date_of_birth: date
    gender: str
    phone: str
