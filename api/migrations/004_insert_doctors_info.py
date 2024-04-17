steps = [
    [

        """
        INSERT INTO doctors (first_name, last_name, specialty)
        VALUES ('Shiran', 'Xiao', 'Family Doctor')
        ;
        """,

        """
        DELETE FROM doctors
        WHERE last_name = 'Xiao';
        """
    ],

    [

        """
        INSERT INTO doctors (first_name, last_name, specialty)
        VALUES ('Genessy', 'Munoz', 'Neurologist')
        ;
        """,

        """
        DELETE FROM doctors
        WHERE last_name = 'Munoz';
        """
    ],

    [

        """
        INSERT INTO doctors (first_name, last_name, specialty)
        VALUES ('Stanley', 'Dorosz', 'Orthopedic')
        ;
        """,

        """
        DELETE FROM doctors
        WHERE last_name = 'Dorosz';
        """
    ],

    [

        """
        INSERT INTO doctors (first_name, last_name, specialty)
        VALUES ('Sean', 'Burch', 'ENT')
        ;
        """,

        """
        DELETE FROM doctors
        WHERE last_name = 'Burch';
        """
    ],

    [

        """
        INSERT INTO doctors (first_name, last_name, specialty)
        VALUES ('Jose', 'Medina', 'Cardiologist')
        ;
        """,

        """
        DELETE FROM doctors
        WHERE last_name = 'Medina';
        """
    ],
]
