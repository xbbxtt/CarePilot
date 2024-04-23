from fastapi import APIRouter, Depends, Response, HTTPException
from typing import List, Optional, Union
from models.users import UserIn, UserOut, UserResponse, UserUpdate
from models.errors import Error
from utils.authentication import hash_password, try_get_jwt_user_data
from queries.user_queries import (
    UserRepository
)


router = APIRouter()


@router.get("/api/patients/{user_id}", response_model=Union[UserOut, Error])
def get_user(
    user_id: int,
    repo: UserRepository = Depends(),
    user_response: UserResponse = Depends(try_get_jwt_user_data),
) -> UserOut:
    if user_response is None:
        raise HTTPException(status_code=401, detail='You must login!')
    return repo.get_user(user_id)


@router.put("/api/patients/{user_id}", response_model=Union[UserOut, Error])
def update_user(
    user_id: int,
    user: UserUpdate,
    repo: UserRepository = Depends(),
    user_response: UserResponse = Depends(try_get_jwt_user_data),
) -> Union[UserOut, Error]:
    if user_response is None:
        raise HTTPException(status_code=401, detail='You must login!')
    if user.password != user.confirmed_password:
        raise HTTPException(status_code=422, detail="Passwords do not match")
    hashed_password = hash_password(user.password)
    return repo.update_user(user_id, user, hashed_password)
