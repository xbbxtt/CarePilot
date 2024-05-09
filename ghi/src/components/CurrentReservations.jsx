import { useCurrentReservationsQuery, useAuthenticateQuery, useDoctorsQuery} from '../app/apiSlice';
import { NavLink } from 'react-router-dom'
import ErrorNotification from './ErrorNotification'
import ReservationDetail from './ReservationDetail'
import SideNav from './SideNav'

const CurrentReservations = () => {
    const { data:user, isLoading:isLoadingUser} = useAuthenticateQuery();
    const { data, isLoading, error } = useCurrentReservationsQuery();
    const { data:doctors, isLoading: doctorload} = useDoctorsQuery();

    if (isLoading) return <>Loading...</>;


    if(error == undefined){
        return (
            <div>
                <br />
                <br />


                <div className="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="">
                                <div class="table-responsive">
                                    <h1>Current Reservations</h1>
                                    <br/>
                                    <table class="table project-list-table table-nowrap align-middle table-borderless">
                                        <thead>
                                            <tr>
                                                <th scope="col">Doctor</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Time</th>
                                                <th scope="col">Reason</th>
                                                <th scope="col">Insurance</th>
                                                <th scope="col" /*style="width: 200px;"*/>Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                {data.map(reservation => {
                                                    const currentDate = new Date(reservation.date)
                                                    const date = currentDate.toLocaleDateString()
                                                    const currentTime = new Date(reservation.date+"T"+reservation.time)
                                                    const time = currentTime.toLocaleTimeString()

                                                    return (


                                                        <tr key={reservation.id}>

                                                                <td><img src={reservation.image} alt="" className="avatar-sm rounded-circle me-2" /><a href="#" className="text-body">{reservation.first_name} {reservation.last_name}</a></td>
                                                                <td>{date}</td>
                                                                <td>{time}</td>
                                                                <td><span className="badge badge-soft-success mb-0">{reservation.reason}</span></td>
                                                                <td>{reservation.insurance}</td>
                                                                <td>
                                                                    <ul className="list-inline mb-0">
                                                                        <li className="list-inline-item">
                                                                            <NavLink to={'/reservations/update'} className={'nav-link'}>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-zoom-in" viewBox="0 0 16 16">
                                                                                    <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11M13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0"/>
                                                                                    <path d="M10.344 11.742q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1 6.5 6.5 0 0 1-1.398 1.4z"/>
                                                                                    <path fill-rule="evenodd" d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5"/>
                                                                                    </svg>

                                                                            </NavLink>

                                                                        </li>
                                                                        <li className="list-inline-item">
                                                                            <a href="javascript:void(0);" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" className="px-2 text-danger"><i className="b font-size-18"></i></a>
                                                                        </li>
                                                                        <li className="list-inline-item dropdown">
                                                                            <a className="text-muted dropdown-toggle font-size-18 px-2" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"><i className="bx bx-dots-vertical-rounded"></i></a>
                                                                            <div className="dropdown-menu dropdown-menu-end">
                                                                                <a className="dropdown-item" href="#">Action</a><a className="dropdown-item" href="#">Another action</a><a className="dropdown-item" href="#">Something else here</a>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </td>
                                                            </tr>
                                                    )

                                                    })}
                                                </tbody>


                                            </table>

                                        </div>
                                        </div>
                                    </div>
                                </div>

                        </div>
                    </div>



    )} else {
        return <ErrorNotification error={error} />;
    }
}

export default CurrentReservations;
