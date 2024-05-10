steps = [
    [
        """
        CREATE TABLE reservations (
            id SERIAL PRIMARY KEY NOT NULL,
            insurance VARCHAR(100) NOT NULL,
            reason TEXT NOT NULL,
            date DATE NOT NULL,
            time TIME NOT NULL,
            patient_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            doctor_id INTEGER NOT NULL REFERENCES doctors(id) ON DELETE CASCADE,
            status VARCHAR(12) NOT NULL,
            meeting_url TEXT NOT NULL
        );
        """,
        """
        DROP TABLE reservations;
        """
    ],
]
