from main import app
from fastapi.testclient import TestClient
from queries.reservation_queries import ReservationRepository
from models.reservations import ReservationIn, ReservationDrOut, ReservationOut, ReservationUpdate
from models.users import UserResponse, UserResponseDetail
from utils.authentication import try_get_jwt_user_data

client = TestClient(app)


def fake_try_get_jwt_user_data():
    return UserResponse(
        id=157,
        username="fake_user",
        first_name="gen",
        last_name="munoz",
        date_of_birth="2024-05-14",
        gender="female",
        phone="9145555555"
    )


class FakeReservationRepository:
    def create(self, reservation: ReservationIn, user_id:int):
        sample_reservations = {

            "id": 157,
            "insurance": reservation.insurance,
            "reason": reservation.reason,
            "date": reservation.date,
            "time": reservation.time,
            "doctor_id": reservation.doctor_id,
            "status": "current",
            "meeting_url": "testmeeting"
    }

        return sample_reservations

    def get_reservation(self, reservation_id: int):
        sample_reservations = {
            "insurance": "blue",
            "reason": "test",
            "date": "2024-05-02",
            "time": "18:08:55.894Z",
            "doctor_id": 2,
            "id": reservation_id,
            "status": "current",
            "first_name": "string",
            "last_name": "string",
            "image": "testimage",
            "meeting_url": "testmeeting"
        }
        return sample_reservations

    def get_all_current_reservations(self):
        sample_reservations = [{
            "insurance": "blue",
            "reason": "test",
            "date": "2024-05-02",
            "time": "18:08:55.894Z",
            "doctor_id": 2,
            "id": 1,
            "status": "current",
            "first_name": "string",
            "last_name": "string",
            "image": "testimage",
            "meeting_url": "testmeeting"
        },
        {
            "insurance": "red",
            "reason": "test",
            "date": "2024-05-02",
            "time": "18:08:55.894Z",
            "doctor_id": 2,
            "id": 2,
            "status": "current",
            "first_name": "string",
            "last_name": "string",
            "image": "testimage",
            "meeting_url": "testmeeting"
        },
        {
            "insurance": "white",
            "reason": "test",
            "date": "2024-05-02",
            "time": "18:08:55.894Z",
            "doctor_id": 4,
            "id": 3,
            "status": "current",
            "first_name": "string",
            "last_name": "string",
            "image": "testimage",
            "meeting_url": "testmeeting"
        }]
        return sample_reservations

    def get_all_completed_reservations(self):
        sample_reservations = [
            {
                "insurance": "blue",
                "reason": "test",
                "date": "2024-05-02",
                "time": "18:08:55.894000Z",
                "doctor_id": 2,
                "id": 1,
                "status": "current",
                "first_name": "string",
                "last_name": "string",
                "image": "testimage",
                "meeting_url": "testmeeting"
            },
            {
                "insurance": "red",
                "reason": "test",
                "date": "2024-05-02",
                "time": "18:08:55.894000Z",
                "doctor_id": 2,
                "id": 2,
                "status": "current",
                "first_name": "string",
                "last_name": "string",
                "image": "testimage",
                "meeting_url": "testmeeting"
            },
            {
                "insurance": "white",
                "reason": "test",
                "date": "2024-05-02",
                "time": "18:08:55.894000Z",
                "doctor_id": 4,
                "id": 3,
                "status": "current",
                "first_name": "string",
                "last_name": "string",
                "image": "testimage",
                "meeting_url": "testmeeting"
            }
        ]
        return sample_reservations

    def update_reservation(self, reservation_id:int, reservation: ReservationUpdate):
        sample_reservations = {

                "insurance": reservation.insurance,
                "reason": reservation.reason,
                "date": reservation.date,
                "time": reservation.time,
                "doctor_id": 1,
                "id": reservation_id,
                "status": "current",
                "first_name": "string",
                "last_name": "string",
                "image": "testimage",
                "meeting_url": "testmeeting"
            }

        return sample_reservations

def test_create():

    app.dependency_overrides[ReservationRepository] = FakeReservationRepository
    app.dependency_overrides[try_get_jwt_user_data] = fake_try_get_jwt_user_data

    body = {
        "insurance": "fidelis",
        "reason": "arm pain",
        "date": "2024-05-01",
        "time": "20:24:47.000Z",
        "doctor_id": 2

    }
    res = client.post('/api/reservations', json=body)

    data = res.json()

    assert res.status_code == 200
    assert data == {
        "id": 157,
        "insurance": "fidelis",
        "reason": "arm pain",
        "date": "2024-05-01",
        "time": "20:24:47Z",
        "doctor_id": 2,
        "status": "current",
        "meeting_url": "testmeeting"

    }


def test_get_reservation():

    app.dependency_overrides[ReservationRepository] = FakeReservationRepository
    app.dependency_overrides[try_get_jwt_user_data] = fake_try_get_jwt_user_data

    res = client.get('/api/reservations/1')
    data = res.json()

    assert res.status_code == 200
    assert data == {
        "id": 1,
        "insurance": "blue",
        "reason": "test",
        "date": "2024-05-02",
        "time": "18:08:55.894000Z",
        "doctor_id": 2,
        "status": "current",
        "first_name": "string",
        "last_name": "string",
        "image": "testimage",
        "meeting_url": "testmeeting"
    }


def test_get_all_current_reservations():

    app.dependency_overrides[ReservationRepository] = FakeReservationRepository
    app.dependency_overrides[try_get_jwt_user_data] = fake_try_get_jwt_user_data

    res = client.get('/api/reservations')

    data = res.json()

    assert res.status_code == 200
    assert data == [{
            "insurance": "blue",
            "reason": "test",
            "date": "2024-05-02",
            "time": "18:08:55.894000Z",
            "doctor_id": 2,
            "id": 1,
            "status": "current",
            "first_name": "string",
            "last_name": "string",
            "image": "testimage",
            "meeting_url": "testmeeting"
        },
        {
            "insurance": "red",
            "reason": "test",
            "date": "2024-05-02",
            "time": "18:08:55.894000Z",
            "doctor_id": 2,
            "id": 2,
            "status": "current",
            "first_name": "string",
            "last_name": "string",
            "image": "testimage",
            "meeting_url": "testmeeting"
        },
        {
            "insurance": "white",
            "reason": "test",
            "date": "2024-05-02",
            "time": "18:08:55.894000Z",
            "doctor_id": 4,
            "id": 3,
            "status": "current",
            "first_name": "string",
            "last_name": "string",
            "image": "testimage",
            "meeting_url": "testmeeting"
        }]
    assert len(data) == 3


def test_get_all_completed_reservations():

    app.dependency_overrides[ReservationRepository] = FakeReservationRepository
    app.dependency_overrides[try_get_jwt_user_data] = fake_try_get_jwt_user_data

    res = client.get('/api/history/reservations')

    data = res.json()

    assert res.status_code == 200
    assert data == [
            {
                "insurance": "blue",
                "reason": "test",
                "date": "2024-05-02",
                "time": "18:08:55.894000Z",
                "doctor_id": 2,
                "id": 1,
                "status": "current",
                "first_name": "string",
                "last_name": "string",
                "image": "testimage",
                "meeting_url": "testmeeting"
            },
            {
                "insurance": "red",
                "reason": "test",
                "date": "2024-05-02",
                "time": "18:08:55.894000Z",
                "doctor_id": 2,
                "id": 2,
                "status": "current",
                "first_name": "string",
                "last_name": "string",
                "image": "testimage",
                "meeting_url": "testmeeting"
            },
            {
                "insurance": "white",
                "reason": "test",
                "date": "2024-05-02",
                "time": "18:08:55.894000Z",
                "doctor_id": 4,
                "id": 3,
                "status": "current",
                "first_name": "string",
                "last_name": "string",
                "image": "testimage",
                "meeting_url": "testmeeting"
            }
        ]
    assert len(data) == 3

def test_update_reservation():

    app.dependency_overrides[ReservationRepository] = FakeReservationRepository
    app.dependency_overrides[try_get_jwt_user_data] = fake_try_get_jwt_user_data

    body = {
        "insurance": "fidelis",
        "reason": "arm pain",
        "date": "2024-05-01",
        "time": "20:24:47Z"

    }
    res = client.put('/api/reservations/2', json=body)

    data = res.json()

    assert res.status_code == 200
    assert data == {
        "insurance": "fidelis",
        "reason": "arm pain",
        "date": "2024-05-01",
        "time": "20:24:47Z",
        "doctor_id": 1,
        "id": 2,
        "status": "current",
        "first_name": "string",
        "last_name": "string",
        "image": "testimage",
        "meeting_url": "testmeeting"
    }
