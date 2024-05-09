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
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="">
                                <div className="table-responsive">
                                    <h1 className="crtitle">Current Reservations</h1>
                                    <br/>
                                    <table className="table project-list-table table-nowrap align-middle table-borderless">
                                        <thead>
                                            <tr>
                                                <th scope="col">Doctor</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Time</th>
                                                <th scope="col">Reason</th>
                                                <th scope="col">Insurance</th>
                                                <th scope="col">Action</th>
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
                                                                    <ul className="list-inline mb-0 mx-3">
                                                                        <li className="list-inline-item">
                                                                            <NavLink to={`/reservations/${reservation.id}/update`} className={'nav-link'}>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard2-pulse-fill" viewBox="0 0 16 16">
                                                                                    <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5"/>
                                                                                    <path d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585q.084.236.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5q.001-.264.085-.5M9.98 5.356 11.372 10h.128a.5.5 0 0 1 0 1H11a.5.5 0 0 1-.479-.356l-.94-3.135-1.092 5.096a.5.5 0 0 1-.968.039L6.383 8.85l-.936 1.873A.5.5 0 0 1 5 11h-.5a.5.5 0 0 1 0-1h.191l1.362-2.724a.5.5 0 0 1 .926.08l.94 3.135 1.092-5.096a.5.5 0 0 1 .968-.039Z"/>
                                                                                </svg>
                                                                            </NavLink>
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
