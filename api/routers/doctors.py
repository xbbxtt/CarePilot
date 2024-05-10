from fastapi import APIRouter, Depends
from typing import List
from models.doctors import DoctorsIn, DoctorsOut
from queries.doctor_queries import (
    DoctorRepository
)

router = APIRouter()


@router.post("/api/doctors", response_model=DoctorsOut)
def create_doctor(
    doctor: DoctorsIn,
    repo: DoctorRepository = Depends(),
) -> DoctorsOut:
    return repo.create(doctor)


@router.get("/api/doctors/{doctor_id}", response_model=DoctorsOut)
def get_doctor(
    doctor_id: int,
    repo: DoctorRepository = Depends(),
) -> DoctorsOut:
    return repo.get_doctor(doctor_id)


@router.get("/api/doctors", response_model=List[DoctorsOut])
def get_all_doctors(
    repo: DoctorRepository = Depends(),
) -> List[DoctorsOut]:
    return repo.get_all_doctors()
