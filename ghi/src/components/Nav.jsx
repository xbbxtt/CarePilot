import {Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import {useSignoutMutation, useAuthenticateQuery, useSigninMutation} from "../app/apiSlice"
import {useEffect} from 'react'

const Nav = () => {
    const navigate = useNavigate()
    const {data: user} = useAuthenticateQuery()
    const [ signout, signoutStatus] = useSignoutMutation()
    const [ signin, signinStatus] = useSigninMutation()
    const location = useLocation()
    const home = location.pathname === '/'


    useEffect(() => {
        if (signoutStatus.isSuccess) navigate('/')
    }, [signoutStatus])

    const onSignoutClick = (e) => {
        signout()
    }

    return (
        <div className>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3">
                <div className="container">

                    <Link to={'/'} className="navbar-brand">
                        <img src="https://imgur.com/sGRwUE2.jpg" alt="CarePilot Logo" className="navbar-logo" />
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
                            {user && home &&(
                                <li className="nav-item">
                                    <NavLink
                                        to={'/reservations/'}
                                        className={'nav-link'}
                                    >
                                        Reservations
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
        </div>
    )
}



export default Nav;
