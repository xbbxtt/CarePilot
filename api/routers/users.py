from fastapi import APIRouter, Depends, Response, HTTPException
from typing import List, Optional, Union
from models.users import UserIn, UserOut, UserResponse
from models.errors import Error
from utils.authentication import hash_password, try_get_jwt_user_data
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


@router.get("/patients/{user_id}", response_model=Union[UserOut, Error])
def get_user(
    user_id: int,
    repo: UserRepository = Depends(),
    user: UserResponse = Depends(try_get_jwt_user_data),
) -> UserOut:
    if user is None:
        raise HTTPException(status_code=401, detail='You must login!')
    return repo.get_user(user_id)
