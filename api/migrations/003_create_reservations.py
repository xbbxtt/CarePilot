steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE reservations (
            id SERIAL PRIMARY KEY NOT NULL,
            insurance VARCHAR(100) NOT NULL,
            reason TEXT NOT NULL,
            date DATE NOT NULL,
            time TIME NOT NULL,
            patient_id INTEGER NOT NULL REFERENCES users("id") ON DELETE CASCADE,
            doctor_id INTEGER NOT NULL,
            status VARCHAR(12) NOT NULL,
            CONSTRAINT fk_doctor_id
            FOREIGN KEY(doctor_id)
            REFERENCES doctors(id)
            ON DELETE CASCADE
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE reservations;
        """
    ],
]
