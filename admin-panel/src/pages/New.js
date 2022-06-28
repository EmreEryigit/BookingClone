import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import "./New.scss"
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const New = (props) => {
  const [file, setFile] = useState("")
  const [info, setInfo] = useState({})
  const handleChange = (e) => {
    setInfo(prev => ({...prev, [e.target.id]: e.target.value}))
  }
  const handleClick = async(e) => {
    e.preventDefault()
    
  }
  return (
    <div className="new">
      <SideBar />
      <div className="newContainer">
        <NavBar />
        <div className="top">
          <h1>{props.title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="" />
          </div>
          <div className="right">
            <form>
            <div className="formInput">
                <label htmlFor="file">
                  Image : <DriveFolderUploadOutlinedIcon  className='icon'/>
                </label>
                <input id='file' type="file" onChange={(e) => setFile(e.target.files[0])} style={{display: "none"}} />
              </div>

              {props.inputs.map(input => (
                <div className="formInput" key={input.id}>
                <label htmlFor="">{input.label}</label>
                <input type={input.type}  onChange={handleChange} placeholder={input.placeholder}/>
              </div>
              ))}
              <button onClick={handleClick} >Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default New