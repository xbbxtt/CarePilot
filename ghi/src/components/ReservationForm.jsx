// @ts-check
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNewReservationMutation, useDoctorsQuery } from '../app/apiSlice'

const newReservation = () => {
    const navigate = useNavigate()
    const [insurance, setInsurance] = useState('')
    const [reason, setReason] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [doctor_id, setDoctorId] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [newReservation, newReservationsStatus] = useNewReservationMutation()
    const { data:doctors, isLoading} = useDoctorsQuery()

    useEffect(() => {
        if (newReservationsStatus.isSuccess)
        {navigate('/reservations')
            window.location.reload()
    }
        if (newReservationsStatus.isError) {
            setErrorMessage(newReservationsStatus.error.data.detail)
        }
    }, [newReservationsStatus, navigate])

    if (isLoading) return <>Loading...</>

    const handleSubmit = (e) => {
        e.preventDefault()
        newReservation({
            insurance,
            reason,
            date,
            time,
            doctor_id,
        })
    }

    return (
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <h1>New Reservation</h1>
                {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="newReservation_insurance" className="form-label">
                            Insurance
                        </label>
                        <input
                            type="boolean"
                            className="form-control"
                            id="newReservation_insurance"
                            value={insurance}
                            onChange={(e) => setInsurance(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="newReservation_reason" className="form-label">
                            Reason
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="newReservation_reason"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="newReservation_date"
                            className="form-label"
                        >
                            Date
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="newReservation_date"
                            value={date}
                            onChange={(e) =>
                                setDate(e.target.value)
                            }
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="newReservation_time"
                            className="form-label"
                        >
                            Time
                        </label>
                        <input
                            type="time"
                            className="form-control"
                            id="newReservation_time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </div>
                    {/* <div className="mb-3">
                        <label
                            htmlFor="newReservation_doctorId"
                            className="form-label"
                        >
                            Doctor
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="newReservation_doctorId"
                            value={doctor_id}
                            onChange={(e) => setDoctorId(e.target.value)}
                        />
                    </div> */}
                    <div className="mb-3">
                        <select onChange={(e) => setDoctorId(e.target.value)} value={doctor_id} required name="doctor" id="doctor" className="form-select">
                            <option value="">Choose a doctor</option>
                            {doctors.map(doctor => {
                            return (
                                <option key={doctor.id} value={doctor.id}>{doctor.first_name} {doctor.last_name}</option>
                            )
                            })}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-success">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default newReservation
