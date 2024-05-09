import { useReservationDetailQuery, useReservationCompleteMutation, useReservationCancelledMutation} from '../app/apiSlice'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import ErrorNotification from './ErrorNotification'
import {useEffect } from 'react'
import SideNav from './SideNav'

const reservationDetail = () => {
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
            <div>
                <br />
                <br />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="">
                                <div className="table-responsive">
                                    <h1 className="crtitle">Reservation Detail</h1>
                                    <br/>
                                    <table className="table project-list-table  align-middle table-borderless">
                                        <thead>
                                            <tr>
                                                <th scope="col">Doctor</th>
                                                <th scope="col">Date</th>
                                                <th scope="col">Time</th>
                                                <th scope="col">Reason</th>
                                                <th scope="col">Insurance</th>
                                                <th scope="col">&nbsp;&nbsp;&nbsp;&nbsp;Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                        <tr key={data.id}>
                                                                <td><img src={data.image} alt="" className="avatar-sm rounded-circle me-2" /><a href="#" className="text-body">{data.first_name} {data.last_name}</a></td>
                                                                <td>{date}</td>
                                                                <td>{time}</td>
                                                                <td><span className="badge badge-soft-success mb-0">{data.reason}</span></td>
                                                                <td>{data.insurance}</td>
                                                                <td>
                                                                    <ul className="list-inline mb-0">
                                                                        <li className="list-inline-item ">
                                                                            <button type="button" className="btn complete" data-bs-toggle="button"
                                                                                onClick={() =>
                                                                                    cancelReservation(data.id)
                                                                                }
                                                                            >
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                                                                                </svg>
                                                                            </button>
                                                                        </li>
                                                                        <li className="list-inline-item">
                                                                            <button type="button" className="btn cancel" data-bs-toggle="button"
                                                                                onClick={() =>
                                                                                    completeReservation(data.id)
                                                                                }
                                                                            >
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                                                                                </svg>
                                                                            </button>
                                                                        </li>
                                                                        <li className="list-inline-item ">
                                                                            <button type="button" className="btn user-update" data-bs-toggle="button"
                                                                                onClick={() =>
                                                                                    navigate(
                                                                                        `/reservations/${data.id}/update`
                                                                                    )
                                                                                }
                                                                            >
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                                                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                                                                                </svg>
                                                                            </button>
                                                                        </li>
                                                                    </ul>
                                                                </td>
                                                            </tr>
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
export default reservationDetail
