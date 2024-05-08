 import {Link, NavLink, useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
import {useNewReservationMutation, useAuthenticateQuery, useDoctorsQuery} from "../app/apiSlice"
import '../style.css'
import headerimage from "../img/headerimage.jpg"


const Home = () => {
    const {data: user} = useAuthenticateQuery()
    const { data:doctors, isLoading} = useDoctorsQuery()

    if (isLoading) return <>Loading...</>

    return (
        <div className= "p-3 mb-2 bg-light.bg-gradient text-black background-color-main">
            <div className="main-head">
                <div className="mb-5"></div>
                <br />
                <br />
                <br />
                <br />
                    <div className="container-lg">
                            <div className="row justify-content-center">
                                <div className="col-md-5 text-center text-md-start">
                                    <h1>
                                        <div className="display-4 ">High Quality Care</div>
                                        <div className="display-5 anytime-title" > Anytime, Anywhere</div>
                                    </h1>
                                    <br/>
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
                                        <Link to={'/signin'} className="btn mainpg-button">
                                            Make A Reservation
                                        </Link>
                                    )}
                                    {user && (
                                        <Link to={'/reservations/new'} className="btn btn-lg mainpg-button">
                                            Make A Reservation
                                        </Link>
                                    )}
                                    </div>
                                <div className="col-md-7 text-center text-md-start justify-content-center">
                                     <img className="img-fluid"
                                            src={ headerimage }
                                            alt="header image"
                                        />

                                </div>
                            </div>
                    </div>
            </div>

            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>


        <div className="cards">
            <div className="container-xl py-5">
                    <div className="team-cards">
                        <h2 className="display-4 font-weight-light text-center meet-team">
                            Meet Our Team
                        </h2>
                        <p className="font-italic text-muted text-center">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit.
                        </p>
                    </div>
                <br/>
                <br/>
                <div className="row text-center">
                        {
                            doctors.map(doctor => {
                                return (
                                    <div className="col-xl-3 col-sm-6 mb-5">
                                        <div className="bg-white rounded shadow-sm py-5 px-4 individual-card">
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
                                })}
                    </div>
                </div>
            </div>
        </div>

        )}

export default Home;
