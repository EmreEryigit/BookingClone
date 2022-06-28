import React, { useEffect, useState } from 'react'
import "./DataTable.scss"
import { DataGrid } from '@mui/x-data-grid';
import { userColumns, userRows } from '../datatable';
import { Link, useLocation } from 'react-router-dom';
import useFetch from "../hooks/useFetch"
import axios from 'axios';
const DataTable = ({columns}) => {
  const location = useLocation()
  const path = location.pathname.split("/")[1]
  const [list, setList] = useState([])
  const {data,loading, error} = useFetch(`/${path}`)
  useEffect(() => {
    setList(data)
  }, [data])
  const handleDelete = async(id) => {
    try {
      await axios.delete(`/${path}/${id}`)
      setList(list.filter(item => item._id !== id))
    } catch (e) {

    }
  }

    const actionColumn = [
        {
            field: "action", headerName: "Action", width: 200, renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link style={{textDecoration: "none"}} to="/users/test"><div className="viewButton">View</div></Link>
                        <div className="deleteButton" onClick={() => handleDelete(params.row._id)} >Delete</div>
                    </div>
                )
            }
        }
    ]
  return (
    <div className="datatable">
       <div className="datatableTitle">
        Add New User
        <Link to="/users/new" style={{textDecoration: "none"}} className="link">
          Add New
        </Link> 
       </div>
      <DataGrid
      className='datagrid'
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={row=> row._id}
      />
    </div>
 
  )
}

export default DataTable