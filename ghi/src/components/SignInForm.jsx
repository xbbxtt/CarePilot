import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSigninMutation } from '../app/apiSlice'


const Login = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [signin, signinStatus] = useSigninMutation()

    useEffect(() => {
        if (signinStatus.isSuccess) navigate('/reservations')
        if (signinStatus.isError) {
            setErrorMessage(signinStatus.error.data.detail)
        }
    }, [signinStatus, navigate])

    const handleSubmit = (e) => {
        e.preventDefault()
        signin({ username, password })
    }

    return (
        <div>
            <br />
            <br />
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1>Login</h1>
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
                        <button type="submit" className="btn btn-success">
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default Login
