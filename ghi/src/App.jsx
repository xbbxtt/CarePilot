import { Outlet } from 'react-router-dom'
import Nav from "./components/Nav"


const API_HOST = import.meta.env.VITE_API_HOST
if (!API_HOST) {
    throw new Error('VITE_API_HOST is not defined')
}


function App() {
    return (
        <div className="App">
            <Nav/>
            <Outlet/>
        </div>
    )
}


export default App
