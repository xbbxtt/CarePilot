from fastapi import APIRouter, Depends, Response, HTTPException
from typing import List, Optional, Union
from models.users import UserIn, UserOut
from models.errors import Error
from utils.authentication import hash_password
from queries.user_queries import (
    UserRepository
)


router = APIRouter()

@router.post("/patients", response_model=Union[UserOut, Error])
def create_user(
    user: UserIn,
    response: Response,
    repo: UserRepository = Depends(),
) -> UserOut:
    if user.password != user.confirmed_password:
        raise HTTPException(status_code=422, detail="Passwords do not match")
    hashed_password = hash_password(user.password)
    return repo.create(user, hashed_password)
