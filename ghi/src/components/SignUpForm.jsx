// @ts-check
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSignupMutation } from '../app/apiSlice'

const Signup = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmed_password, setConfirmedPassword] = useState('')
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [date_of_birth, setDateOfBirth] = useState('')
    const [gender, setGender] = useState('')
    const [phone, setPhone] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [signup, signupStatus] = useSignupMutation()

    console.log(signupStatus)

    useEffect(() => {
        if (signupStatus.isSuccess) navigate('/')
        if (signupStatus.isError) {
            setErrorMessage(signupStatus.error.data.detail)
        }
    }, [signupStatus, navigate])

    const handleSubmit = (e) => {
        e.preventDefault()
        signup({
            username,
            password,
            confirmed_password,
            first_name,
            last_name,
            date_of_birth,
            gender,
            phone,
        })
    }

    return (
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <h1>Sign Up</h1>
                {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="Login__username" className="form-label">
                            Username
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="Login__username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Login__password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="Login__password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="Login__confirmed_password"
                            className="form-label"
                        >
                            Confirmed Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="Login__confirmed_password"
                            value={confirmed_password}
                            onChange={(e) =>
                                setConfirmedPassword(e.target.value)
                            }
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="Login__first_name"
                            className="form-label"
                        >
                            First Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="Login__first_name"
                            value={first_name}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="Login__last_name"
                            className="form-label"
                        >
                            Last Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="Login__last_name"
                            value={last_name}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label
                            htmlFor="Login__date_of_birth"
                            className="form-label"
                        >
                            Date of Birth
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="Login__date_of_birth"
                            value={date_of_birth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Login__gender" className="form-label">
                            Gender
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="Login__gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Login__phone" className="form-label">
                            Phone
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="Login__phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Signup
