import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import "./newHotel.scss"
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const NewHotel = (props) => {
  const [file, setFile] = useState("")
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
                <input type={input.type}  placeholder={input.placeholder}/>
              </div>
              ))}
              <button>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewHotel;