import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const carePilotApi = createApi({
    reducerPath: 'carePilotApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_HOST,

    }),
    endpoints: (builder) => ({
        authenticate: builder.query({
            query: () => ({
                url: '/api/auth/authenticate',
                credentials: 'include'
            }),
            providesTags: ["Users"]
        }),
        signout: builder.mutation({
            query: () => ({
                url: '/api/auth/signout',
                method: 'DELETE',
                credentials: 'include'
            }),
            invalidatesTags: ["Users"]
        }),
        signin: builder.mutation({
            query: (body) => ({
                url: '/api/auth/signin',
                method: 'POST',
                body,
                credentials: 'include'
            }),
            invalidatesTags: ["Users"]
        }),
        signup: builder.mutation({
            query: (body) => ({
                url: '/api/auth/signup',
                method: 'POST',
                body,
                credentials: 'include'
            }),
            invalidatesTags: ["Users"]
        }),
        newReservation: builder.mutation({
            query: (body) => ({
                url: '/api/reservations',
                method: 'POST',
                body,
                credentials: 'include'
            }),
            invalidatesTags: ["Users"]
        }),
        currentReservations: builder.query({
            query: () => ({
                url: '/api/reservations',
                method: 'GET',
                credentials: 'include'
            }),
            invalidatesTags: ["Users"]
        }),
        pastReservations: builder.query({
            query: () => ({
                url: '/api/history/reservations',
                method: 'GET',
                credentials: 'include'
            }),
            invalidatesTags: ["Users"]
        }),
        reservationDetail: builder.query({
            query: (reservation_id) => ({
                url: `/api/reservations/${reservation_id}`,
                method: 'GET',
                reservation_id,
                credentials: 'include'
            }),
            invalidatesTags: ["Users"]
        }),
        reservationUpdate: builder.mutation({
            query: ({reservation_id, body}) => ({
                url: `/api/reservations/${reservation_id}`,
                method: 'PUT',
                body,
                credentials: 'include'
            }),
            invalidatesTags: ["Users"]
        })
    })
})

export const {
    useAuthenticateQuery,
    useSignoutMutation,
    useSigninMutation,
    useSignupMutation,
    useNewReservationMutation,
    useCurrentReservationsQuery,
    usePastReservationsQuery,
    useReservationDetailQuery,
    useReservationUpdateMutation,
} = carePilotApi
