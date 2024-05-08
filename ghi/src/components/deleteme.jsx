return (
        <div>
            <header className="header">

                {/* <div className="content"> */}
                    <div className="col-xl-3 col-sm-6 col-mb-5">
                        <h1>
                            <span>High Quality Care</span>
                            <br />
                            Anytime, Anywhere{' '}
                        </h1>
                        <p>
                            Lorem Ipsum has been the industry's standard dummy text
                            ever since the 1500s, when an unknown printer took a
                            galley of type and scrambled it to make a type specimen
                            book. Lorem Ipsum has been the industry's standard dummy
                            text ever since the 1500s, when an unknown printer took
                            a galley of type and scrambled it to make a type
                            specimen book.
                        </p>
                        {!user && (
                            <Link to={'/signin'} className="btn">
                                Make A Reservation
                            </Link>
                        )}
                        {user && (
                            <Link to={'/reservations/new'} className="btn">
                                Make A Reservation
                            </Link>
                        )}
                    </div>
                    <div className="col-xl-3 col-sm-8 col-mb-5">
                        <div className="image">
                        <img
                                src="https://imgur.com/kDjQvVv.jpg"
                                alt="header image"
                                className="home-image"
                            />
                        </div>
                    </div>
{/* </div> */}




            </header>
            <section>
                <div className="container-xl py-5">
                    <div className="team-cards">
                        <h2 className="display-4 font-weight-light">
                            Meet Our Team
                        </h2>
                        <p className="font-italic text-muted">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit.
                        </p>
                    </div>

                    <div className="row text-center">
                        {
                            doctors.map(doctor => {
                                return (
                                    <div className="col-xl-3 col-sm-6 mb-5">
                                        <div className="bg-white rounded shadow-sm py-5 px-4">
                                            <img
                                                src={doctor.image}
                                                alt=""
                                                width="100"
                                                className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                                            />
                                            <h5 className="mb-0">{doctor.first_name} {doctor.last_name}</h5>
                                            <span className="small text-uppercase text-muted">
                                                {doctor.specialty}
                                            </span>
                                            <ul className="social mb-0 list-inline mt-3">
                                                <li className="list-inline-item">
                                                    <a href="#" className="social-link">
                                                        <i className="fa fa-facebook-f"></i>
                                                    </a>
                                                </li>
                                                <li className="list-inline-item">
                                                    <a href="#" className="social-link">
                                                        <i className="fa fa-twitter"></i>
                                                    </a>
                                                </li>
                                                <li className="list-inline-item">
                                                    <a href="#" className="social-link">
                                                        <i className="fa fa-instagram"></i>
                                                    </a>
                                                </li>
                                                <li className="list-inline-item">
                                                    <a href="#" className="social-link">
                                                        <i className="fa fa-linkedin"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                )
                                })

                        }


                    </div>
                </div>
            </section>
            <footer>
                <div class="footer">
                    <div class="container2">
                        <div class="row text-center">
                            <div class="col-lg-12 col-sm-12 col-xs-12">
                                <div class="footer_menu">
                                    <ul>
                                        <li><a href="#">Home</a></li>
                                        <li><a href="#">About</a></li>
                                        {/* <li><a href="#">Reservations</a></li> */}
                                        {/* <li><a href="#">Doctors</a></li> */}
                                        <li><a href="#">Contact</a></li>
                                    </ul>
                                </div>
                                <div class="footer_copyright">
                                    <p>© 2024 Carepilot All Rights Reserved.</p>
                                </div>
                                <div class="footer_profile">
                                    <ul>
                                        <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                                        <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                                        <li><a href="#"><i class="fa fa-instagram"></i></a></li>
                                        <li><a href="#"><i class="fa fa-pinterest"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>

    )
}

export default Home
