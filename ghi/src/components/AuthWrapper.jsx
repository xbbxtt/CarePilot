import { useAuthenticateQuery } from "../app/apiSlice"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const AuthWrapper = ({children}) => {
    const { data: user, isLoading: isLoadingUser } = useAuthenticateQuery()
    const navigate = useNavigate()
    useEffect(() => {
        if (!user && !isLoadingUser) {
            navigate('/')
        }
    }, [user, isLoadingUser, navigate])
        if (isLoadingUser) return <div>isLoading</div>
    return (
        <>
            {children}
        </>
    )
}


export default AuthWrapper
