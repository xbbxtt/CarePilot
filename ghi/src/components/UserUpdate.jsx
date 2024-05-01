// @ts-check
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserUpdateMutation, useAuthenticateQuery } from '../app/apiSlice'

const UserUpdate = () => {
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [confirmed_password, setConfirmedPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const { data, isLoading, error } = useAuthenticateQuery()
    const [userUpdate, userUpdateStatus] = useUserUpdateMutation()

    console.log(data)
    console.log(userUpdateStatus)

    useEffect(() => {
        if (data) {
            setPhone(data.phone)
        }
    }, [data, setPhone])

    useEffect(() => {
        if (userUpdateStatus.isSuccess)
        {navigate(`/patients/me`)
            window.location.reload()
    }
        if (userUpdateStatus.isError) {
            setErrorMessage(userUpdateStatus.error.data.detail)
        }
    }, [userUpdateStatus, navigate])

    const handleSubmit = (e) => {
        e.preventDefault()
        userUpdate({
            body: {
            password,
            confirmed_password,
            phone,
            },
            user_id: data.id
        })
    }

    return (
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <h1>Update Information</h1>
                {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                )}
                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Date Of Birth</th>
                                <th>Gender</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={data.id}>
                                <td>{data.username}</td>
                                <td>{data.first_name}</td>
                                <td>{data.last_name}</td>
                                <td>{data.date_of_birth}</td>
                                <td>{data.gender}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="Update__password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="Update__password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="Update__confirmed_password"
                            className="form-label"
                        >
                            Confirmed Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="Update__confirmed_password"
                            value={confirmed_password}
                            onChange={(e) =>
                                setConfirmedPassword(e.target.value)
                            }
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Update__phone" className="form-label">
                            Phone
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="Update__phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
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

export default UserUpdate
