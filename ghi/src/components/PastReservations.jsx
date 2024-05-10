import { usePastReservationsQuery } from '../app/apiSlice';
import { NavLink } from 'react-router-dom'
import ErrorNotification from './ErrorNotification'
import SideNav from './SideNav';

const PastReservations = () => {
    const { data, isLoading, error } = usePastReservationsQuery()

    if (isLoading) return <>Loading...</>

    if (error == undefined) {
        return (
            <div>
                <br />
                <br />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="">
                                <div className="table-responsive">
                                    <h1 className="crtitle">
                                        Past Reservations
                                    </h1>
                                    <br />
                                    <table className="table project-list-table table-nowrap align-middle table-borderless">
                                        <thead>
                                            <tr>
                                                <th scope="col">Doctor</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Time</th>
                                                <th scope="col">Reason</th>
                                                <th scope="col">Insurance</th>
                                                <th scope="col"> </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.map((reservation) => {
                                                const currentDate = new Date(
                                                    reservation.date
                                                )
                                                const date =
                                                    currentDate.toLocaleDateString()
                                                const currentTime = new Date(
                                                    reservation.date +
                                                        'T' +
                                                        reservation.time
                                                )
                                                const time =
                                                    currentTime.toLocaleTimeString()

                                                return (
                                                    <tr key={reservation.id}>
                                                        <td>
                                                            <img
                                                                src={
                                                                    reservation.image
                                                                }
                                                                alt=""
                                                                className="avatar-sm rounded-circle me-2"
                                                            />
                                                            <a
                                                                href="#"
                                                                className="text-body"
                                                            >
                                                                {
                                                                    reservation.first_name
                                                                }{' '}
                                                                {
                                                                    reservation.last_name
                                                                }
                                                            </a>
                                                        </td>
                                                        <td>{date}</td>
                                                        <td>{time}</td>
                                                        <td>
                                                            <span className="badge badge-soft-success mb-0">
                                                                {
                                                                    reservation.reason
                                                                }
                                                            </span>
                                                        </td>
                                                        <td>
                                                            {
                                                                reservation.insurance
                                                            }
                                                        </td>
                                                        <td></td>
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
        )
    } else {
        return <ErrorNotification error={error} />
    }
}
export default PastReservations;
