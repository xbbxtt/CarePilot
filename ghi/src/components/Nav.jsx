import {Link, NavLink, useNavigate } from 'react-router-dom'
import {useSignoutMutation, useAuthenticateQuery, useSigninMutation, useUserDetailQuery} from "../app/apiSlice"
import {useEffect} from 'react'

const Nav = () => {
    const navigate = useNavigate()
    const {data: user} = useAuthenticateQuery()
    const [ signout, signoutStatus] = useSignoutMutation()
    const [ signin, signinStatus] = useSigninMutation()
    

    useEffect(() => {
        if (signoutStatus.isSuccess) navigate('/')
    }, [signoutStatus])

    const onSignoutClick = (e) => {
        signout()
    }

    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3">
            <div className="container">
                <Link to={'/'} className="navbar-brand">
                    CarePilot
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to={'/'} className={'nav-link'}>
                                Home
                            </NavLink>
                        </li>
                        {!user && (
                            <li className="nav-item">
                                <NavLink to={'/signin'} className={'nav-link'}>
                                    Login
                                </NavLink>
                            </li>
                        )}
                        {!user && (
                            <li className="nav-item">
                                <NavLink to={'/signup'} className={'nav-link'}>
                                    Sign Up
                                </NavLink>
                            </li>
                        )}
                        {user && (
                            <li className="nav-item">
                                <NavLink
                                    to={'/reservations/new'}
                                    className={'nav-link'}
                                >
                                    New Reservation
                                </NavLink>
                            </li>
                        )}
                        {user && (
                            <li className="nav-item">
                                <NavLink
                                    to={'/reservations'}
                                    className={'nav-link'}
                                >
                                    Current Reservations
                                </NavLink>
                            </li>
                        )}

                        {user && (
                            <li className="nav-item">
                                <NavLink
                                    to={'/reservations/history'}
                                    className={'nav-link'}
                                >
                                    Reservation History
                                </NavLink>
                            </li>
                        )}
                        {user && (
                            <li className="nav-item">
                                <NavLink
                                    to={`/patients/${user.id}`}
                                    className={'nav-link'}
                                >
                                    Patient Information
                                </NavLink>
                            </li>
                        )}
                    </ul>
                    {user && (
                        <button
                            className="btn btn-outline-danger"
                            onClick={onSignoutClick}
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    )
}



export default Nav;
