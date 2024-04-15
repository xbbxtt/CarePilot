from pydantic import BaseModel
from datetime import datetime


class DoctorsIn(BaseModel):
    first_name: str
    last_name: str
    specialty: str


class DoctorsOut(DoctorsIn):
    id: int
