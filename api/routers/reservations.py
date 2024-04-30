from fastapi import APIRouter, Depends, HTTPException, Response
from typing import List, Optional, Union
from models.errors import Error
from models.reservations import ReservationOut, ReservationIn, ReservationUpdate, ReservationDrOut
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


@router.get("/api/reservations/{reservation_id}", response_model=Union[ReservationDrOut, Error])
def get_reservation(
    reservation_id: int,
    repo: ReservationRepository = Depends(),
    user_response: UserResponse = Depends(try_get_jwt_user_data),
) -> ReservationDrOut:
    if user_response is None:
        raise HTTPException(status_code=401, detail='You must login!')
    return repo.get_reservation(reservation_id)


@router.get("/api/reservations", response_model=Union[List[ReservationDrOut], Error])
def get_all_current_reservations(
    repo: ReservationRepository = Depends(),
    user_response: UserResponse = Depends(try_get_jwt_user_data),
) -> List[ReservationDrOut]:
    if user_response is None:
        raise HTTPException(status_code=401, detail='You must login!')
    return repo.get_all_current_reservations()


@router.get("/api/history/reservations", response_model=Union[List[ReservationDrOut], Error])
def get_all_completed_reservations(
    repo: ReservationRepository = Depends(),
    user_response: UserResponse = Depends(try_get_jwt_user_data),
) -> List[ReservationDrOut]:
    if user_response is None:
        raise HTTPException(status_code=401, detail='You must login!')
    return repo.get_all_completed_reservations()


@router.put("/api/reservations/{reservation_id}", response_model=Union[ReservationDrOut, Error])
def update_reservation(
    reservation_id: int,
    reservation: ReservationUpdate,
    repo: ReservationRepository = Depends(),
    user_response: UserResponse = Depends(try_get_jwt_user_data),
) -> Union[ReservationDrOut, Error]:
    if user_response is None:
        raise HTTPException(status_code=401, detail='You must login!')
    return repo.update_reservation(reservation_id, reservation)


@router.put("/api/reservations/{reservation_id}/cancel", response_model=Union[ReservationOut, Error])
def cancel_reservation(
    reservation_id: int,
    repo: ReservationRepository = Depends(),
    user_response: UserResponse = Depends(try_get_jwt_user_data),
) -> Union[ReservationOut, Error]:
    if user_response is None:
        raise HTTPException(status_code=401, detail='You must login!')
    return repo.cancel_reservation(reservation_id)


@router.put("/api/reservations/{reservation_id}/complete", response_model=Union[ReservationOut, Error])
def complete_reservation(
    reservation_id: int,
    repo: ReservationRepository = Depends(),
    user_response: UserResponse = Depends(try_get_jwt_user_data),
) -> Union[ReservationOut, Error]:
    if user_response is None:
        raise HTTPException(status_code=401, detail='You must login!')
    return repo.complete_reservation(reservation_id)
