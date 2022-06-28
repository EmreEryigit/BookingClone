import {useContext, useState} from 'react'
import "./header.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi} from "@fortawesome/free-solid-svg-icons"
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import {useNavigate} from "react-router-dom"
import { SearchContext } from '../context/SearchContext';
import { AuthContext } from '../context/AuthContext';
const Header = (props) => {
  const navigate = useNavigate()
  const [destination, setDestination] = useState("")
  const [openDate, setOpenDate] = useState(false)
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date (),
      key: 'selection'
    }
  ]);
  const [openOption, setOpenOption] = useState(false)
  const [options, setOptions] = useState({
    adult : 1,
    children : 0,
    room : 1
  })

  const handleOption = (name, ops) => {
    setOptions(prev => {
      return {
        ...prev, [name]: ops === "i" ? prev[name] + 1 : prev[name] - 1
      }
    })
  }
  const {dispatch} = useContext(SearchContext)
  const {user} = useContext(AuthContext)
  const handleSearch = () => {
    dispatch({type: "NEW_SEARCH", payload: {
      destination,
      dates,
      options
    }})
    navigate("/hotels",{state: {destination, dates,options}})
  }
  return (
    <div className='header'>
      <div className={props.type === "list" ? "headerContainer listMode" : "headerContainer" }>
        <div className="headerList">
            <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed}/>
            <span>Stays</span>
            </div>
            <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane}/>
            <span>Fligths</span>
            </div>
            <div className="headerListItem">
            <FontAwesomeIcon icon={faCar}/>
            <span>Car rentals</span>
            </div>
            <div className="headerListItem">
            <FontAwesomeIcon icon={faBed}/>
            <span>Attractions</span>
            </div>
            <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi}/>
            <span>Airport Taxis</span>
            </div>
        </div>
       {props.type !== "list" && <> <h1 className="headerTitle">Find your next stay</h1>
          <p className="headerDesc">
          Search deals on hotels, homes, and much more...
          </p>
          {!user && <button className="headerBtn">Sign in / Register</button>}
        <div className="headerSearch">
          <div className="headerSearchItem">
          <FontAwesomeIcon icon={faBed} className="headerIcon"/>
          <input type="text" placeholder='Where are you going?'  className='headerSearchInput' onChange={(e) => setDestination(e.target.value)}/>
          </div>
          <div onClick={() => setOpenDate(prev => !prev) } className="headerSearchItem">
          <FontAwesomeIcon icon={faCalendarDays} className="headerIcon"/>
          <span  className='headerSearchText'>{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(dates[0].endDate, "dd/MM/yyyy")}`}</span>
          {openDate && <DateRange
            editableDateInputs={true}
            onChange={item => setDates([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dates}
            className="date"
            minDate={new Date()}
              />}
          </div>
          <div onClick={() => setOpenOption(prev => !prev)} className="headerSearchItem">
          <FontAwesomeIcon icon={faPerson} className="headerIcon"/>
          <span className='headerSearchText'>{`${options.adult} adult -  ${options.children} children - ${options.room} room`}</span>
         {openOption &&  <div className="options">
            <div className="optionItem">
              <span className="optionText">Adult</span>
              <div className="optionCounter">
              <button className="optionCounterButton" disabled={options.adult <= 1} onClick={() => handleOption("adult", "d")}>-</button>
              <span className="optionCounterNumber">{options.adult}</span>
              <button className="optionCounterButton" onClick={() => handleOption("adult", "i")}>+</button>
              </div>
            </div>
            <div className="optionItem">
              <span className="optionText">Children</span>
              <div className="optionCounter">
              <button className="optionCounterButton" disabled={options.children <= 0}  onClick={() => handleOption("children", "d")}>-</button>
              <span className="optionCounterNumber">{options.children}</span>
              <button className="optionCounterButton" onClick={() => handleOption("children", "i")}>+</button>
              </div>
            </div>
            <div className="optionItem">
              <span className="optionText">Room</span>
              <div className="optionCounter">
              <button className="optionCounterButton" disabled={options.room <= 1} onClick={() => handleOption("room", "d")}>-</button>
              <span className="optionCounterNumber">{options.room}</span>
              <button className="optionCounterButton" onClick={() => handleOption("room", "i")}>+</button>
              </div>
            </div>
          </div>}
          </div>
          <div className="headerSearchItem">
          <button className="headerBtn" onClick={handleSearch}>Search</button>
          </div>
        </div> </>}
      </div>
    </div>
  )
}

export default Header