from fastapi import APIRouter, Depends, HTTPException, Response
from typing import List, Optional, Union
from models.errors import Error
from models.doctors import DoctorsIn, DoctorsOut
from queries.doctor_queries import (
    DoctorRepository
)

router = APIRouter()


@router.post("/api/doctors", response_model=Union[DoctorsOut, Error])
def create_doctor(
    doctor: DoctorsIn,
    response: Response,
    repo: DoctorRepository = Depends(),
) -> DoctorsOut:

    return repo.create(doctor)


@router.get("/api/doctors/{doctor_id}", response_model=Union[DoctorsOut, Error])
def get_doctor(
    doctor_id: int,
    repo: DoctorRepository = Depends(),
) -> DoctorsOut:
    return repo.get_doctor(doctor_id)


@router.get("/api/doctors", response_model=Union[List[DoctorsOut], Error])
def get_all_doctors(
    repo: DoctorRepository = Depends(),
) -> List[DoctorsOut]:
    return repo.get_all_doctors()