import React from 'react'
import SideBar from "../components/SideBar"
import NavBar from "../components/NavBar"
import "./List.scss"
import DataTable from '../components/DataTable'
const List = ({columns}) => {
  return (
    <div className="list">
      <SideBar />
      <div className="listContainer">
        <NavBar />
        <DataTable  columns={columns}/>
      </div>
    </div>
  )
}

export default List