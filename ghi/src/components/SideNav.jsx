import {Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuthenticateQuery } from '../app/apiSlice'
import '../style.css'

const SideNav = () => {

    const {data: user} = useAuthenticateQuery()

    return (

        <div className="col-2" id="navbarNav2">

                <h4>Sidebar</h4>
            <div className="sidenav-font">
                <br/>
                <br/>
                {user && (
                     <div className="nav-item">
                        <NavLink to={'/patients/me'} className={'nav-link'}>
                            <i className="lni lni-user"></i>&nbsp;
                                        Patient Information
                                    </NavLink>
                    </div>
                )}
                <br/>
                <br/>
                {user && (
                    <>
                        <div className="dropdown">
                            <button className="btn-side btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="lni lni-clipboard"></i>&nbsp;
                                Reservations
                                </button>

                            <div className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton">
                                <button className="btn-side2" type="button"
                                 aria-haspopup="true" aria-expanded="false">
                                <NavLink to={'/reservations'} className='dropdown-item-disabled'>
                                        Current Reservations
                                </NavLink>
                                </button>
                                <button className="btn-side2" type="button"
                                 aria-haspopup="true" aria-expanded="false">
                                <NavLink to={'/reservations/history'} className='dropdown-item-disabled2'>
                                        Past Reservations
                                </NavLink>
                                </button>
                                <button className="btn-side2" type="button"
                                 aria-haspopup="true" aria-expanded="false">
                                <NavLink to={'/reservations/new'} className='dropdown-item-disabled3'>
                                        Create New Reservation
                                </NavLink>
                                </button>


                            </div>
                        </div>
                     </>
                )}
                <br/>
                <br/>

            </div>

        </div>

    )
}



export default SideNav;
