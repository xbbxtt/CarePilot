//@ts-check
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import AuthWrapper from './components/AuthWrapper'
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
import ReservationForm from './components/ReservationForm'
import CurrentReservations from './components/CurrentReservations'
import PastReservations from './components/PastReservations'
import ReservationDetail from './components/ReservationDetail'
import ReservationUpdate from './components/ReservationUpdate'
import UserUpdate from './components/UserUpdate'
import UserDetail from './components/UserDetail'
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
                    element: (
                        <AuthWrapper>
                            <ReservationForm />
                        </AuthWrapper>
                    ),
                },
                {
                    path: 'reservations',
                    element: (
                        <AuthWrapper>
                            <CurrentReservations />
                        </AuthWrapper>
                    ),
                },
                {
                    path: 'reservations/history',
                    element: (
                        <AuthWrapper>
                            <PastReservations />
                        </AuthWrapper>
                    ),
                },
                {
                    path: 'reservations/:id',
                    element: (
                        <AuthWrapper>
                            <ReservationDetail />
                        </AuthWrapper>
                    ),
                },
                {
                    path: 'reservations/:id/update',
                    element: (
                        <AuthWrapper>
                            <ReservationUpdate />
                        </AuthWrapper>
                    ),
                },
                {
                    path: 'patients/:id/update',
                    element: (
                        <AuthWrapper>
                            <UserUpdate />
                        </AuthWrapper>
                    ),
                },
                {
                    path: 'patients/me',
                    element: (
                        <AuthWrapper>
                            <UserDetail />
                        </AuthWrapper>
                    ),
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
