import { useAuthenticateQuery } from '../app/apiSlice'
import { NavLink, useNavigate } from 'react-router-dom'
import ErrorNotification from './ErrorNotification'
import SideNav from './SideNav'

const UserDetail = () => {
    const { data, isLoading, error } = useAuthenticateQuery()
    const navigate = useNavigate()


    if (isLoading) return <>Loading...</>

    if (error == undefined) {
        const currentDate = new Date(data.date_of_birth)
        console.log("**********", data)
        const date_of_birth = currentDate.toLocaleDateString()
        return (
            <div>
                <br />
                <br />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="">
                                <div className="table-responsive">
                                    <h1 className="crtitle">Patient Detail</h1>
                                    <br/>
                                    <table className="table project-list-table table-nowrap align-middle table-borderless">
                                        <thead>
                                            <tr>
                                                <th scope="col">Username</th>
                                                <th scope="col">First Name</th>
                                                <th scope="col">Last Name</th>
                                                <th scope="col">Date Of Birth</th>
                                                <th scope="col">Gender</th>
                                                <th scope="col">Phone</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                        <tr key={data.id}>
                                                                <td>{data.username}</td>
                                                                <td>{data.first_name}</td>
                                                                <td>{data.last_name}</td>
                                                                <td>{date_of_birth}</td>
                                                                <td>{data.gender}</td>
                                                                <td>{data.phone}</td>

                                                                <td>
                                                                    <ul className="list-inline  mb-0">
                                                                        <li>
                                                                            <button type="button" className="btn user-update" data-bs-toggle="button"
                                                                                onClick={() =>
                                                                                    navigate(
                                                                                        `/patients/update`
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
export default UserDetail
