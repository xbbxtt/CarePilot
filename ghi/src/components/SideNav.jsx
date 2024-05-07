import {Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuthenticateQuery } from '../app/apiSlice'
import '../style.css'

const SideNav = () => {

    const {data: user} = useAuthenticateQuery()

    return (

        <div className="col-2" id="navbarNav">

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
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="lni lni-clipboard"></i>&nbsp;
                                Reservations
                                </button>

                            <div className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton">
                                <NavLink to={'/reservations'} className='dropdown-item-disabled'>
                                        Current Reservations
                                 </NavLink>
                                 <NavLink to={'/reservations/history'} className='dropdown-item-disabled2'>
                                        Past Reservations
                                 </NavLink>
                                 <NavLink to={'/reservations/new'} className='dropdown-item-disabled3'>
                                        Create New Reservation
                                 </NavLink>


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
