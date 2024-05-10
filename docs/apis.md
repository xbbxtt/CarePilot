# APIs

## Authentication

- **Method**: `POST`
- **Path**: `/api/auth/signup`

Input:

```json
{
  "first_name": "string",
  "last_name": "string",
  "username": "string",
  "password": "string",
  "confirmed_password": "string",
  "date_of_birth": "2024-05-10",
  "gender": "string",
  "phone": "string"
}
```

Output:

```json
{
  "id": 0,
  "username": "string"
}
```

- **Method**: `POST`
- **Path**: `/api/auth/signin`

Input:

```json
{
  "username": "string",
  "password": "string"
}
```

Output:

```json
{
  "id": 0,
  "username": "string",
  "first_name": "string",
  "last_name": "string",
  "date_of_birth": "2024-05-10",
  "gender": "string",
  "phone": "string"
}
```

- **Method**: `PUT`
- **Path**: `/api/auth/update`

Input:

```json
{
  "password": "string",
  "confirmed_password": "string",
  "phone": "string"
}
```

Output:

```json
{
  "first_name": "string",
  "last_name": "string",
  "username": "string",
  "password": "string",
  "confirmed_password": "string",
  "date_of_birth": "2024-05-10",
  "gender": "string",
  "phone": "string",
  "id": 0
}
```

- **Method**: `DELETE`
- **Path**: `/api/auth/signout`

Input:

```json

```

Output:

```json
"string"
```

- **Method**: `GET`
- **Path**: `/api/auth/authenticate`

Input:

```json

```

Output:

```json
{
  "id": 0,
  "username": "string",
  "first_name": "string",
  "last_name": "string",
  "date_of_birth": "2024-05-10",
  "gender": "string",
  "phone": "string"
}
```

Creating a new user(patient). Sign a user in. Update a user information. Get user information with authenticate. Delete token when sign a user out.

## Reservations

- **Method**: `POST`,
- **Path**: `/api/reservations`,

Input:

```json
{
  "insurance": "string",
  "reason": "string",
  "date": "2024-05-10",
  "time": "18:36:43.116Z",
  "doctor_id": 0
}

```

Output:

```json
{
  "insurance": "string",
  "reason": "string",
  "date": "2024-05-10",
  "time": "18:36:43.116Z",
  "doctor_id": 0,
  "id": 0,
  "status": "string",
  "meeting_url": "string"
}
```

- **Method**: `GET`,
- **Path**: `/api/reservations`,

Input:

```json
```

Output:

```json
[
  {
    "insurance": "string",
    "reason": "string",
    "date": "2024-05-10",
    "time": "18:37:30.362Z",
    "doctor_id": 0,
    "id": 0,
    "status": "string",
    "first_name": "string",
    "last_name": "string",
    "image": "string",
    "meeting_url": "string"
  }
]
```

- **Method**: `GET`,
- **Path**: `/api/history/reservations`,

Input:

```json
```

Output:

```json
[
  {
    "insurance": "string",
    "reason": "string",
    "date": "2024-05-10",
    "time": "18:37:30.362Z",
    "doctor_id": 0,
    "id": 0,
    "status": "string",
    "first_name": "string",
    "last_name": "string",
    "image": "string",
    "meeting_url": "string"
  }
]
```

- **Method**: `GET`
- **Path**: `/api/reservations/{reservation_id}`,

Input:

```json
"reservation_id": "integer"
```

Output:

```json
{
  "insurance": "string",
  "reason": "string",
  "date": "2024-05-10",
  "time": "18:38:27.342Z",
  "doctor_id": 0,
  "id": 0,
  "status": "string",
  "first_name": "string",
  "last_name": "string",
  "image": "string",
  "meeting_url": "string"
}
```

- **Method**: `PUT`
- **Path**: `/api/reservations/{reservation_id}`,

Input:

```json
{
  "insurance": "string",
  "reason": "string",
  "date": "2024-05-10",
  "time": "18:40:21.044Z"
}
```

Output:

```json
{
  "insurance": "string",
  "reason": "string",
  "date": "2024-05-10",
  "time": "18:40:21.045Z",
  "doctor_id": 0,
  "id": 0,
  "status": "string",
  "first_name": "string",
  "last_name": "string",
  "image": "string",
  "meeting_url": "string"
}
```

- **Method**: `PUT`
- **Path**: `/api/reservations/{reservation_id}/cancel`,

Input:

```json
"reservation_id": "integer"
```

Output:

```json
{
  "insurance": "string",
  "reason": "string",
  "date": "2024-05-10",
  "time": "18:41:10.101Z",
  "doctor_id": 0,
  "id": 0,
  "status": "string",
  "meeting_url": "string"
}
```

- **Method**: `PUT`
- **Path**: `/api/reservations/{reservation_id}/complete`,

Input:

```json
"reservation_id": "integer"
```

Output:

```json
{
  "insurance": "string",
  "reason": "string",
  "date": "2024-05-10",
  "time": "18:41:10.101Z",
  "doctor_id": 0,
  "id": 0,
  "status": "string",
  "meeting_url": "string"
}
```

Creating a new reservation. Get all current reservations list. Get history reservations list. Get a reservation. Update a reservation. Cancel a reservation. Complete a reservation.

## Doctors

- Method: `POST`
- Path: `/api/doctors

Input:

```json
{
  "first_name": "string",
  "last_name": "string",
  "specialty": "string",
  "image": "string"
}
```

Output:

```json
{
  "first_name": "string",
  "last_name": "string",
  "specialty": "string",
  "image": "string",
  "id": 0
}
```

- Method: `GET`
- Path: `/api/doctors/{doctor_id}

Input:

```json
```

Output:

```json
[
  {
    "first_name": "string",
    "last_name": "string",
    "specialty": "string",
    "image": "string",
    "id": 0
  }
]
```

- Method: `GET`
- Path: `/api/doctors

Input:

```json
"doctor_id": "integer"
```

Output:

```json
{
  "first_name": "string",
  "last_name": "string",
  "specialty": "string",
  "image": "string",
  "id": 0
}
```

Create a doctor. Get a doctor information. List all doctors.

## Zoom

- Method: `GET`
- Path: `/zoom

Input:

```json
```

Output:

```json
```

- Method: `GET`
- Path: `/callback

Input:

```json
```

Output:

```json
"string"
```

- Method: `GET`
- Path: `/url

Input:

```json
```

Output:

```json
"string"
```

The zoom APIs is to direct developer to zoom, sign in. Zoom redirects developer to call back with authorize code. Call back page send post request with authorize code to exchange access token. The url API is using access token to create a zoom meeting link.
