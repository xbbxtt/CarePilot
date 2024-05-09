import { useReservationDetailQuery, useReservationCompleteMutation, useReservationCancelledMutation} from '../app/apiSlice'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import ErrorNotification from './ErrorNotification'
import {useEffect } from 'react'
import SideNav from './SideNav'
const ReservationDetail = () => {
    const { id } = useParams()
    const { data, isLoading, error } = useReservationDetailQuery(id)
    const navigate = useNavigate()
    const [completeReservation, completeReservationStatus] = useReservationCompleteMutation()
    const [cancelReservation, cancelReservationStatus] = useReservationCancelledMutation()
    useEffect(() => {
        if (completeReservationStatus.isSuccess)
        {navigate('/reservations')
            window.location.reload()
    }
        if (completeReservationStatus.isError) {
            setErrorMessage(completeReservationStatus.error.data.detail)
        }
    }, [completeReservationStatus, navigate])
    useEffect(() => {
        if (cancelReservationStatus.isSuccess)
        {navigate('/reservations')
            window.location.reload()
    }
        if (cancelReservationStatus.isError) {
            setErrorMessage(cancelReservationStatus.error.data.detail)
        }
    }, [cancelReservationStatus, navigate])
    if (isLoading) return <>Loading...</>
    if (error == undefined) {
        const currentDate = new Date(data.date)
        const date = currentDate.toLocaleDateString()
        const currentTime = new Date(data.date+"T"+data.time)
        const time = currentTime.toLocaleTimeString()
        return (
            <div className="container-fluid h-100">
            <div className="row h-100">
                <SideNav/>
                    <div className="col-10">
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
                                        <td>{date}</td>
                                        <td>{time}</td>
                                        <td>
                                            {data.first_name} {data.last_name}
                                        </td>
                                        <td>{data.reason}</td>
                                        <td>{data.insurance}</td>
                                        <td>
                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/reservations/${data.id}/update`
                                                    )
                                                }
                                            >
                                                Update
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() =>
                                                    cancelReservation(data.id)
                                                }
                                            >
                                                Cancel
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() =>
                                                    completeReservation(data.id)
                                                }
                                            >
                                                Complete
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
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



<li className="list-inline-item">
    <NavLink to={`/reservations/${data.id}/update`} className={'nav-link'}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
        </svg>
    </NavLink>
</li>
