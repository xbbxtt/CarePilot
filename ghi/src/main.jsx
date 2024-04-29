//@ts-check
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
import ReservationForm from './components/ReservationForm'
import CurrentReservations from './components/CurrentReservations'
import PastReservations from './components/PastReservations'
import ReservationDetail from './components/ReservationDetail'
import ReservationUpdate from './components/ReservationUpdate'
import Home from './components/Home'
import App from './App'

import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store'

const BASE_URL = import.meta.env.BASE_URL
if (!BASE_URL) {
    throw new Error('BASE_URL is not defined')
}

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <App />,
            children: [
                {
                    index: true,
                    element: <Home />,
                },
                {
                    path: 'signup',
                    element: <SignUpForm />,
                },
                {
                    path: 'signin',
                    element: <SignInForm />,
                },
                {
                    path: 'reservations/new',
                    element: <ReservationForm />,
                },
                {
                    path: 'reservations',
                    element: <CurrentReservations />,
                },
                {
                    path: 'reservations/history',
                    element: <PastReservations />,
                },
                {
                    path: 'reservations/:id',
                    element: <ReservationDetail />,
                },
                {
                    path: 'reservations/:id/update',
                    element: <ReservationUpdate />,
                },
            ],
        },
    ],
    {
        basename: BASE_URL,
    }
)

const rootElement = document.getElementById('root')
if (!rootElement) {
    throw new Error('root element was not found!')
}

// Log out the environment variables while you are developing and deploying
// This will help debug things
console.table(import.meta.env)

const root = ReactDOM.createRoot(rootElement)
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
)
