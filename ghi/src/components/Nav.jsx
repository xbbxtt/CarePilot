import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import {useSignoutMutation, useAuthenticateQuery} from "../app/apiSlice"
import {useEffect} from 'react'
import logo from "../img/logo.png"


const Nav = () => {
    const navigate = useNavigate()
    const {data: user} = useAuthenticateQuery()
    const [ signout, signoutStatus] = useSignoutMutation()
    const location = useLocation()
    const home = location.pathname === '/'

    useEffect(() => {
        if (signoutStatus.isSuccess) {
            navigate('/')
            window.location.reload()
        }
    }, [signoutStatus])

    const onSignoutClick = (e) => {
        signout()
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <NavLink to={'/'} className={'nav-link'}>
                        <img src={logo} width="100px"></img>&nbsp;&nbsp;
                    </NavLink>
                    <NavLink to={'/'} className={'nav-link'}>
                        <span className="fw-normal title">CarePilot</span>
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end align-center" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink to={'/'} className={'nav-link'}>
                                    Home&nbsp;&nbsp;
                                </NavLink>
                            </li>
                             {!user && (
                                <li className="nav-item">
                                    <NavLink to={'/signin'} className={'nav-link'}>
                                        Login&nbsp;
                                    </NavLink>
                                </li>
                            )}
                            {!user && (
                                <li className="nav-item">
                                    <NavLink to={'/signup'} className={'nav-link'}>
                                        Sign Up&nbsp;
                                    </NavLink>
                                </li>
                            )}
                            {user && home &&(
                                <li className="nav-item">
                                    <NavLink to={'/reservations/'} className={'nav-link'}>
                                        Reservations
                                    </NavLink>
                                </li>
                            )}
                            {user && (
                                <li className="nav-item">
                                    <NavLink to={'/patients/me'} className={'nav-link'}>
                                        Profile
                                    </NavLink>
                                </li>
                            )}
                            {user && !home &&(
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Reservations
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <NavLink to={'/reservations/'} className={'nav-link fw-light dpitem' } style= {{color: 'black'}}  >
                                            Current Reservations
                                        </NavLink>
                                        <NavLink to={'/reservations/history/'} className={'nav-link fw-light dpitem'} style= {{color: 'black'}} >
                                            Past Reservations
                                        </NavLink>
                                        <NavLink to={'/reservations/new/'} className={'nav-link fw-light dpitem'} style= {{color: 'black'}}>
                                            Create new reservation
                                        </NavLink>
                                    </div>
                                </li>
                            )}
                            {user && (
                            <button
                                className="btn btn-outline-danger"
                                onClick={onSignoutClick}
                            >
                                Logout
                            </button>
                            )}

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}


export default Nav;
