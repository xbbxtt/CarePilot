import {Link, NavLink, useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
import {useNewReservationMutation, useAuthenticateQuery} from "../app/apiSlice"
import '../style.css'


const Home = () => (
    <div>
        <section
            className="bg-dark text-light p-5 text-left text-sm-smart"
            id="home"
        >
            <div className="container py-5">
                <div className="d-sm-flex align-item-center justify-content-between py-5">
                    <div>
                        <h1 className="virtual-care-title">Virtual Care</h1>
                        <h3 className="my-4">We bring the doctor to you!</h3>
                        <p className="lead my-4">
                            Lorem Ipsum has been the industry's standard dummy
                            text ever since the 1500s, when an unknown printer
                            took a galley of type and scrambled it to make a
                            type specimen book.
                        </p>
                        <NavLink
                            to={'/signin'}
                            className={'btn btn-primary btn-lg'}
                        >
                            Make a Reservation
                        </NavLink>
                    </div>
                    <a href="#"></a>
                    <img
                        src="https://imgur.com/btoIi1Z.jpg"
                        className="img-fluid rounded"
                        width="700"
                    ></img>
                </div>
            </div>
        </section>
    </div>
)

export default Home
