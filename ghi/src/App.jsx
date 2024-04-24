// This makes VSCode check types as if you are using TypeScript
//@ts-check
import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import ErrorNotification from './components/ErrorNotification'

import './App.css'

// When using environment variables, you should do a check to see if
// they are defined or not and throw an appropriate error message
const API_HOST = import.meta.env.VITE_API_HOST

if (!API_HOST) {
    throw new Error('VITE_API_HOST is not defined')
}

/**
 * This is an example of using JSDOC to define types for your component
 * @typedef {{module: number, week: number, day: number, min: number, hour: number}} LaunchInfo
 * @typedef {{launch_details: LaunchInfo, message?: string}} LaunchData
 *
 * @returns {React.ReactNode}
 */
function App() {
    return (
        <div className="App">
            <header className="App-header">{/* <Nav /> */}</header>
            {/* <ErrorNotification error={error} /> */}
        </div>
    )
}

export default App
