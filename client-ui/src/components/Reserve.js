import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import useFetch from '../hooks/useFetch'
import {SearchContext} from "../context/SearchContext"
import axios from 'axios'
import "./reserve.css"
const Reserve = (props) => {
    const {data,loading,error,reFetch} = useFetch(`/hotels/room/${props.hotelId}`)
    const [selectedRooms, setSelectedRooms] = useState([])
    const {dates} = useContext(SearchContext)
    const getDatesInRange = (startDate,endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const date = new Date(start.getTime())
        let list = []
        while(date <= end){
            list.push(new Date(date))
            date.setDate(date.getDate() +1)
        }
        return list
    }
    const allDates = getDatesInRange(dates[0]?.startDate, dates[0]?.endDate)

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some(date => allDates.includes(new Date(date).getTime()))
        return !isFound
    }
    const handleSelect = (e) => {
        const checked = e.target.checked
        const value = e.target.value
        setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter(room => room !== value))
    }
    const handleClick = async(e) => {
        try {
            await Promise.all(selectedRooms.map(roomId => {
                console.log(roomId,allDates)

                const res = axios.put(`http://localhost:4000/rooms/availability/${roomId}`, {dates: allDates})
                return res.data
            }))
            props.setOpen(false)
        }catch (e) {

        }
    }
  return (
    <div className='reserve'>
        <div className="rContainer">
            <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={ ()  => props.setOpen(false)} />
            <span>Select your rooms: </span>
            {data.map(item => (
                <div className="rItem" key={item.id}>
                    <div className="rItemInfo">
                        <div className="rTitle">{item.title}</div>
                        <div className="rDesc">{item.desc}</div>
                        <div className="rMax">
                        Max people: <b>{item.maxPeople}</b>
                        </div>
                        <div className="rPrice">{item.price}</div>

                    </div>
                    <div className="rSelectRooms">

                 
                        {item.roomNumbers.map(roomNumber => (
                    <div className="room">
                            <label>{roomNumber.number}</label>
                            <input type="checkbox" value={roomNumber._id}  onChange={handleSelect} disabled={!isAvailable(roomNumber)}/>
                    </div>
                        ))}
                        </div>
                        
                </div>
            ))}
            <button className="rButton" onClick={handleClick}>Reserve Now</button>
        </div>
    </div>
  )
}

export default Reserve