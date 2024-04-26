import { useCurrentReservationsQuery } from '../app/apiSlice';
import { NavLink } from 'react-router-dom'
import ErrorNotification from './ErrorNotification'

const CurrentReservations = () => {
    const { data, isLoading, error } = useCurrentReservationsQuery();

    if (isLoading) return <>Loading...</>


    if(error.data.detail){
        return (<div><ErrorNotification error={error} /></div>)
    }
    return (
        <>
            <div>
                <h1 className='mt-3'>
                    Current reservations
                </h1>
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
                            <NavLink className="nav-link active" aria-current="page" to={`/reservations/new/`}>
                                <button variant="primary">Create New Reservation</button>
                            </NavLink>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map(reservation => {
                        return (
                                <tr key={reservation.id} >
                                    <td>{ reservation.date }</td>
                                    <td>{ reservation.time }</td>
                                    <td>{ reservation.doctor_id }</td>
                                    <td>{ reservation.reason }</td>
                                    <td>{ reservation.insurance }</td>
                                    {/* <td>
                                        <button onClick={() => cancelAppoinment(createdAppointment.id)}>Cancel</button>
                                    </td>
                                    <td>
                                        <button onClick={() => finishAppoinment(createdAppointment.id)}>Finish</button>
                                    </td> */}
                                </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default CurrentReservations;
