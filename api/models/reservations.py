from pydantic import BaseModel
from datetime import datetime


class ReservationIn(BaseModel):
    insurance: bool
    reason: str
    date_time: datetime
    patient_id: int
    doctor_id: int
    status: str


class ReservationOut(ReservationIn):
    id: int


class ReservationUpdate(BaseModel):
    insurance: bool
    reason: str
    date_time: datetime
