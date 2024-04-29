import { useReservationDetailQuery } from '../app/apiSlice'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import ErrorNotification from './ErrorNotification'

const ReservationDetail = () => {
    const { id } = useParams()
    const { data, isLoading, error } = useReservationDetailQuery(id)
    const navigate = useNavigate()


    if (isLoading) return <>Loading...</>
    console.log(error)
    console.log(data)
    if (error == undefined) {
        return (
            <>
                <div>
                    <h1 className="mt-3">Reservation Detail</h1>
                </div>
                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Doctor</th>
                                <th>Reason</th>
                                <th>Insurance</th>
                                <th>
                                    <NavLink
                                        className="nav-link active"
                                        aria-current="page"
                                        to={`/reservations/new/`}
                                    >
                                        <button variant="primary">
                                            Create New Reservation
                                        </button>
                                    </NavLink>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                                    <tr key={data.id}>
                                        <td>{data.date}</td>
                                        <td>{data.time}</td>
                                        <td>{data.doctor_id}</td>
                                        <td>{data.reason}</td>
                                        <td>{data.insurance}</td>
                                        <td>
                                        <button onClick={() => navigate(`/reservations/${data.id}/update`)}>Update</button>
                                        </td>
                                        {/* <td>
                                        <button onClick={() => cancelAppoinment(createdAppointment.id)}>Cancel</button>
                                    </td>
                                    <td>
                                        <button onClick={() => finishAppoinment(createdAppointment.id)}>Finish</button>
                                    </td> */}
                                    </tr>
                        </tbody>
                    </table>
                </div>
            </>
        )
    } else {
        return (
            <div>
                <ErrorNotification error={error} />
            </div>
        )
    }
}
export default ReservationDetail
