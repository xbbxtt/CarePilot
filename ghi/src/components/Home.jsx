 import {Link, NavLink, useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
import {useNewReservationMutation, useAuthenticateQuery} from "../app/apiSlice"
import '../style.css'


const Home = () => {
    const {data: user} = useAuthenticateQuery()
    return (
        <div>
            <header className="header">
                <div className="content">
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
                <div className="image">
                    <img
                        src="https://imgur.com/kDjQvVv.jpg"
                        alt="header image"
                        className="home-image"
                    />
                </div>
            </header>
            <section>
                <div className="container py-5">
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
                        <div className="col-xl-3 col-sm-6 mb-5">
                            <div className="bg-white rounded shadow-sm py-5 px-4">
                                <img
                                    src="https://imgur.com/4TKVFr4.jpg"
                                    alt=""
                                    width="100"
                                    className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                                />
                                <h5 className="mb-0">Shiran Xiao</h5>
                                <span className="small text-uppercase text-muted">
                                    Family Doctor
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

                        <div className="col-xl-3 col-sm-6 mb-5">
                            <div className="bg-white rounded shadow-sm py-5 px-4">
                                <img
                                    src="https://imgur.com/az1wbrm.jpg"
                                    alt=""
                                    width="100"
                                    className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                                />
                                <h5 className="mb-0">Genessy Munoz</h5>
                                <span className="small text-uppercase text-muted">
                                    Neurologist
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

                        <div className="col-xl-3 col-sm-6 mb-5">
                            <div className="bg-white rounded shadow-sm py-5 px-4">
                                <img
                                    src="https://imgur.com/p4D5njq.jpg"
                                    alt=""
                                    width="100"
                                    className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                                />
                                <h5 className="mb-0">Stanley Dorosz</h5>
                                <span className="small text-uppercase text-muted">
                                    Orthopedic
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

                        <div className="col-xl-3 col-sm-6 mb-5">
                            <div className="bg-white rounded shadow-sm py-5 px-4">
                                <img
                                    src="https://imgur.com/CLDqvNt.jpg"
                                    alt=""
                                    width="100"
                                    className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                                />
                                <h5 className="mb-0">Sean Burch</h5>
                                <span className="small text-uppercase text-muted">
                                    ENT
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

                        <div className="col-xl-3 col-sm-6 mb-5">
                            <div className="bg-white rounded shadow-sm py-5 px-4">
                                <img
                                    src="https://imgur.com/ec3twf6.jpg"
                                    alt=""
                                    width="100"
                                    className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                                />
                                <h5 className="mb-0">Jose Medina</h5>
                                <span className="small text-uppercase text-muted">
                                    Cardiologist
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
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
