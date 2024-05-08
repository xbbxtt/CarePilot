steps = [
    [

        """
        INSERT INTO doctors (first_name, last_name, specialty, image)
        VALUES ('Shiran', 'Xiao', 'Family Doctor', 'https://imgur.com/4TKVFr4.jpg')
        ;
        """,

        """
        DELETE FROM doctors
        WHERE last_name = 'Xiao';
        """
    ],

    [

        """
        INSERT INTO doctors (first_name, last_name, specialty, image)
        VALUES ('Genessy', 'Munoz', 'Neurologist', 'https://imgur.com/jzmWSnw.jpg')
        ;
        """,

        """
        DELETE FROM doctors
        WHERE last_name = 'Munoz';
        """
    ],

    [

        """
        INSERT INTO doctors (first_name, last_name, specialty, image)
        VALUES ('Stanley', 'Dorosz', 'Orthopedic', 'https://imgur.com/p4D5njq.jpg')
        ;
        """,

        """
        DELETE FROM doctors
        WHERE last_name = 'Dorosz';
        """
    ],

    [

        """
        INSERT INTO doctors (first_name, last_name, specialty, image)
        VALUES ('Sean', 'Burch', 'ENT', 'https://imgur.com/CLDqvNt.jpg')
        ;
        """,

        """
        DELETE FROM doctors
        WHERE last_name = 'Burch';
        """
    ],

    [

        """
        INSERT INTO doctors (first_name, last_name, specialty, image)
        VALUES ('Jose', 'Medina', 'Cardiologist', 'https://imgur.com/ec3twf6.jpg')
        ;
        """,

        """
        DELETE FROM doctors
        WHERE last_name = 'Medina';
        """
    ],
]
