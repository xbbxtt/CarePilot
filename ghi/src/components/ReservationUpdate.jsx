import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useReservationUpdateMutation, useReservationDetailQuery } from '../app/apiSlice'


const ReservationUpdate = () => {
    const { id } = useParams()
    const { data, isLoading } = useReservationDetailQuery(id)
    const navigate = useNavigate()
    const [insurance, setInsurance] = useState('')
    const [reason, setReason] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [reservationUpdate, reservationUpdateStatus] = useReservationUpdateMutation()

    useEffect(() => {
        if (data) {
            setInsurance(data.insurance),
            setReason(data.reason),
            setDate(data.date),
            setTime(data.time)
        }
    }, [data, setInsurance, setReason, setDate, setTime])

    useEffect(() => {
        if (reservationUpdateStatus.isSuccess)
        {navigate('/reservations')
            window.location.reload()
    }
        if (reservationUpdateStatus.isError) {
            setErrorMessage(reservationUpdateStatus.error.data.detail)
        }
    }, [reservationUpdateStatus, navigate])

    if (isLoading) return <>Loading...</>

    const handleSubmit = (e) => {
        e.preventDefault()
        reservationUpdate({
            body: {
                insurance,
                reason,
                date,
                time,
            },
            reservation_id: id
        })
    }

    return (
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <br />
                <br />
                <h1 className="text-center">Update Reservation</h1>
                <br />
                {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                )}
                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Doctor</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={data.id}>
                                <td>
                                    {data.first_name} {data.last_name}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label
                            htmlFor="UpdateReservation_insurance"
                            className="form-label"
                        >
                            Insurance
                        </label>
                        <input
                            type="boolean"
                            className="form-control"
                            id="UpdateReservation_insurance"
                            value={insurance}
                            onChange={(e) => setInsurance(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="UpdateReservation_reason"
                            className="form-label"
                        >
                            Reason
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="UpdateReservation_reason"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="UpdateReservation_date"
                            className="form-label"
                        >
                            Date
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="UpdateReservation_date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="UpdateReservation_time"
                            className="form-label"
                        >
                            Time
                        </label>
                        <input
                            type="time"
                            className="form-control"
                            id="UpdateReservation_time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success">
                        Update
                    </button>
                </form>
            </div>
        </div>
    )
}


export default ReservationUpdate
