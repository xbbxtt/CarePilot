 import {Link, NavLink, useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
import {useNewReservationMutation, useAuthenticateQuery} from "../app/apiSlice"
import '../style.css'


const Home = () => {
    const {data: user} = useAuthenticateQuery()
    return (
    <div>
        <header class="header">
        <div class="content">
          <h1><span>High Quality Care</span><br />Anytime, Anywhere </h1>
          <p>
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a
            type specimen book. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a
            type specimen book.
          </p>
          {!user && (
          <Link to={'/signin'} className="btn">
            Make A Reservation
          </Link>
          )}
          {user && (
          <Link to={'/reservations/new'} className="btn">
            Make A Reservation
          </Link>
          )}
        </div>
        <div class="image">
          <img src="https://imgur.com/kDjQvVv.jpg" alt="header image" className="home-image" />

          </div>

      </header>


    </div>
    )
}

export default Home
