import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import axios from "axios"

import "./Login.scss"
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    })

    const {loading, error, dispatch} = useContext(AuthContext)

    const handleChange = (e) => {
        setCredentials(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }))
    }
    const handleLogin = async(e) => {
        e.preventDefault()
        dispatch({type: "LOGIN_START"})
        try {
            const res = await axios.post("auth/login", credentials)
            dispatch({type: "LOGIN_SUCCESS", payload: res.data.details})
            if(res.data.isAdmin) {

              navigate("/")
            }else {
              dispatch({type: "LOGIN_FAILURE", payload: "You are not allowed"})
            }
        } catch (e) {
            dispatch({type: "LOGIN_FAILURE", payload: e.message})
        }
    }
  return (
    <div className='login'>
        <div className="lContainer">
            <input type="text" className="lInput" placeholder='Username' id='username' onChange={handleChange} />
            <input type="password" className="lInput" placeholder='Password' id='password' onChange={handleChange} />
            <button disabled={loading} onClick={handleLogin} className='lButton'>Login</button>
            {error && <span>{error}</span>}
        </div>
    </div>
  )
}

export default Login