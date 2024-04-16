"""
Pydantic Models for Users.
"""
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
    """
    Represents a the parameters needed to create a new user
    """

    username: str
    password: str


class UserResponse(BaseModel):
    """
    Represents a user, with the password not included
    """

    id: int
    username: str


class UserWithPw(BaseModel):
    """
    Represents a user with password included
    """

    id: int
    username: str
    password: str
