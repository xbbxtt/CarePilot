from pydantic import BaseModel


class DoctorsIn(BaseModel):
    first_name: str
    last_name: str
    specialty: str


class DoctorsOut(DoctorsIn):
    id: int
    first_name: str
    last_name: str
    specialty: str
