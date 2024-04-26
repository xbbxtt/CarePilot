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
} = carePilotApi
