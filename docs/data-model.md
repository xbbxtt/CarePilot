# Data models

---

### users

| name          | type                     | unique | optional |
| ------------- | ------------------------ | ------ | -------- |
| id            | serial                   | yes    | no       |
| first_name    | string                   | no     | no       |
| last_name     | string                   | no     | no       |
| username      | string                   | yes    | no       |
| password      | string                   | no     | no       |
| date_of_birth | date                     | no     | no       |
| gender        | string                   | no     | no       |
| phone         | string                   | no     | no       |

### doctors

| name          | type                     | unique | optional |
| ------------- | ------------------------ | ------ | -------- |
| id            | serial                   | yes    | no       |
| first_name    | string                   | no     | no       |
| last_name     | string                   | no     | no       |
| specialty     | string                   | no     | no       |
| image         | string                   | no     | no       |

### reservations

| name          | type                       | unique | optional |
| ------------- | -------------------------- | ------ | -------- |
| id            | serial                     | yes    | no       |
| insurance     | string                     | no     | no       |
| reason        | string                     | no     | no       |
| date          | date                       | no     | no       |
| time          | time                       | no     | no       |
| patient_id    | reference to user entity   | no     | no       |
| doctor_id     | reference to doctor entity | no     | no       |
| status        | string                     | no     | no       |
| meeting_url   | string                     | no     | no       |

### tokens

| name          | type                     | unique | optional |
| ------------- | ------------------------ | ------ | -------- |
| id            | serial                   | yes    | no       |
| token         | string                   | no     | no       |
