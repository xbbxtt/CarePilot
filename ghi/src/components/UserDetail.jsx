import { useAuthenticateQuery } from '../app/apiSlice'
import { NavLink, useNavigate } from 'react-router-dom'
import ErrorNotification from './ErrorNotification'

const UserDetail = () => {
    const { data, isLoading, error } = useAuthenticateQuery()
    const navigate = useNavigate()


    if (isLoading) return <>Loading...</>

    if (error == undefined) {
        return (
            <>
                <div>
                    <h1 className="mt-3">User Details</h1>
                </div>
                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Date Of Birth</th>
                                <th>Gender</th>
                                <th>Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={data.id}>
                                <td>{data.username}</td>
                                <td>{data.first_name}</td>
                                <td>{data.last_name}</td>
                                <td>{data.date_of_birth}</td>
                                <td>{data.gender}</td>
                                <td>{data.phone}</td>
                                <td>
                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/patients/update`
                                            )
                                        }
                                    >
                                        Update
                                    </button>
                                </td>
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
export default UserDetail
