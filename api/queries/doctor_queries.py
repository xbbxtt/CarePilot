import psycopg
from queries.pool import pool
from typing import List
from models.doctors import DoctorsOut, DoctorsIn
from fastapi import HTTPException


class DoctorRepository:
    def create(self, doctor: DoctorsIn) -> DoctorsOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO doctors
                            (first_name, last_name, specialty, image)
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            doctor.first_name,
                            doctor.last_name,
                            doctor.specialty,
                            doctor.image,
                        ]
                    )
                    id = result.fetchone()[0]
                    return self.doctor_in_to_out(id, doctor)
        except Exception:
            raise HTTPException(status_code=401, detail="Create did not work")


    def doctor_in_to_out(self, id: int, doctor: DoctorsIn):
        old_data = doctor.dict()
        return DoctorsOut(id=id, **old_data)


    def get_doctor(self, doctor_id: int) -> DoctorsOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM doctors
                        WHERE id = %s;
                        """,
                        [
                            doctor_id
                        ]
                    )
                    record = result.fetchone()
                    return self.record_to_doctor_out(record)
        except Exception:
            raise HTTPException(status_code=404, detail="Could not get reservation")


    def record_to_doctor_out(self, record):
        return DoctorsOut(
            id=record[0],
            first_name=record[1],
            last_name=record[2],
            specialty=record[3],
            image=record[4],
        )


    def get_all_doctors(self) -> List[DoctorsOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM doctors
                        ORDER BY id;
                        """,
                    )
                    return [
                        self.record_to_doctor_out(record)
                        for record in result
                    ]
        except Exception:
            raise HTTPException(status_code=404, detail="Could not get reservation")
