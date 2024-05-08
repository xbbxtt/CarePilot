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

            <div className="container">

                <div className="row align-items-center">



                        <SideNav/>


                        <div className="col-10">
                            <div className="">
                                <div className="row">
                                    <div className="mb-3">
                                        <h5 className="card-title">Reservations</h5>
                                    </div>
                                </div>
                                <div className="row">
                                <div className="table-responsive">
                                    <table className="table project-list-table table-nowrap align-middle table-borderless">
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
                                                            <th scope="row" className="ps-4">
                                                                <div className="form-check font-size-16"><input type="checkbox" className="form-check-input" id="contacusercheck1" /><label className="form-check-label" for="contacusercheck1"></label></div>
                                                            </th>
                                                            <td><img src={reservation.image} alt="" className="avatar-sm rounded-circle me-2" /><a href="#" className="text-body">{reservation.first_name} {reservation.last_name}</a></td>
                                                            <td>{date}</td>
                                                            <td>{time}</td>
                                                            <td><span className="badge badge-soft-success mb-0">{reservation.reason}</span></td>
                                                            <td>{reservation.insurance}</td>
                                                            <td>
                                                                <ul className="list-inline mb-0">
                                                                    <li className="list-inline-item">
                                                                        <a href="javascript:void(0);" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit" className="px-2 text-primary"><i className="bx bx-pencil font-size-18"></i></a>
                                                                    </li>
                                                                    <li className="list-inline-item">
                                                                        <a href="javascript:void(0);" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" className="px-2 text-danger"><i className="bx bx-trash-alt font-size-18"></i></a>
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


                            {/* <table classNameName="table table-striped">
                                <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Doctor</th>
                                    <th>Reason</th>
                                    <th>Insurance</th>

                                    <th>
                                        <NavLink classNameName="nav-link active" aria-current="page" to={`/reservations/new/`}>
                                            <button variant="primary">Create New Reservation</button>
                                        </NavLink>
                                    </th>
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
                                            <td>{date}</td>
                                            <td>{time}</td>
                                            <td>
                                                {reservation.first_name} {reservation.last_name}
                                            </td>
                                            <td>{reservation.reason}</td>
                                            <td>{reservation.insurance}</td>


                                            <td>
                                                <NavLink
                                                    classNameName="nav-link active"
                                                    aria-current="page"
                                                    to={`/reservations/${reservation.id}/`}
                                                >
                                                    <button variant="primary">
                                                        Detail
                                                    </button>
                                                </NavLink>
                                            </td> */}
                                            {/* <td>
                                                    <button onClick={() => cancelAppoinment(createdAppointment.id)}>Cancel</button>
                                                </td>
                                                <td>
                                                    <button onClick={() => finishAppoinment(createdAppointment.id)}>Finish</button>
    //                                             </td> */}
    {/* //                                     </tr>
    //                                 )
    //                             })}
    //                             </tbody> */}
    {/* //                         </table> */}
    {/* //                     </div> */}
    {/* //             </div> */}
    {/* //     </div>
    //  </div> */}
    {/* //         )
    // }

    // else { */}
    {/* //     return (<div><ErrorNotification error={error} /></div>)
    // } */}
