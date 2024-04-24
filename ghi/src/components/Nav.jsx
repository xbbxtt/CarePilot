import {Link, NavLink, useNavigate} from 'react-router-dom'
import {useSignoutMutation, useAuthenticateQuery} from "../app/apiSlice"
import {useEffect} from 'react'

const Nav = () => {
    const navigate = useNavigate()
    const {data: user} = useAuthenticateQuery()
    const [ signout, signoutStatus] = useSignoutMutation()
    console.log({user})
    console.log({signoutStatus})

    useEffect(() => {
        if (signoutStatus.isSuccess) navigate('/')
    }, [signoutStatus])

    const onSignoutClick = (e) => {
        signout()
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link to={'/'} className="navbar-brand">CarePilot</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to={'/'} className={'nav-link'}>Home</NavLink>
                        </li>
                        {!user && <li className="nav-item">
                            <NavLink to={'/login'} className={'nav-link'}>Login</NavLink>
                        </li>}
                        {!user && <li className="nav-item">
                            <NavLink to={'/signup'} className={'nav-link'}>Sign Up</NavLink>
                        </li>}
                    </ul>
                    {user && <button className="btn btn-outline-danger" onClick={onSignoutClick}>
                        Logout
                    </button>}
                </div>
            </div>
        </nav>
    )
}



export default Nav;
