steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE reservations (
            id SERIAL PRIMARY KEY NOT NULL,
            insurance BOOLEAN NOT NULL,
            reason TEXT NOT NULL,
            date_time TIMESTAMP NOT NULL,
            patient_id INTEGER NOT NULL REFERENCES users("id") ON DELETE CASCADE,
            doctor_id INTEGER NOT NULL REFERENCES doctors("id") ON DELETE CASCADE,
            status VARCHAR(12) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE reservations;
        """
    ],
]
