import React, { useContext } from 'react'
import "./navbar.css"
import {Link} from "react-router-dom"
import { AuthContext } from '../context/AuthContext'
const Navbar = () => {
  const {user, dispatch} = useContext(AuthContext)
  return (
    <div className="navbar">
        <div className="navContainer">
        <Link to="/" style={{color: "inherit", textDecoration: "none"}}>
        <span className="logo">Booking</span>
        </Link>
         
           <div className="navItems">
                {!user &&  <>
                <button className="navButton">Login</button>
                <button className="navButton">Register</button>
                  </>}
                {user && <>
                <span >{user.username}</span>
                <button className="navButton" onClick={() => dispatch({type: "LOGOUT"})}>Logout</button>
                </>}
                  
            </div>
    
        </div>
    </div>
  )
}

export default Navbar