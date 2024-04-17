from fastapi import APIRouter, Depends, HTTPException, Response
from typing import List, Optional, Union
from models.errors import Error
from models.reservations import ReservationOut, ReservationIn, ReservationUpdate
from models.users import UserResponse
from utils.authentication import try_get_jwt_user_data
from queries.reservation_queries import (
    ReservationRepository
)

router = APIRouter()

@router.post("/api/reservations", response_model=Union[ReservationOut, Error])
def create_reservation(
    reservation: ReservationIn,
    response: Response,
    repo: ReservationRepository = Depends(),
    user_response: UserResponse = Depends(try_get_jwt_user_data),
) -> ReservationOut:
    if user_response is None:
        raise HTTPException(status_code=401, detail='You must login!')
    return repo.create(reservation, user_response.id)
