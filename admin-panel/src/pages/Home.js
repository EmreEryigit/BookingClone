import React from 'react'
import FeaturedChart from '../components/FeaturedChart'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Widget from '../components/Widget'
import Chart from '../components/Chart'
import "./Home.scss"
import BasicTable from '../components/Table'
const Home = () => {
  return (
    <div className="home">
        <SideBar />
        <div className="homeContainer">
          <NavBar />
          <div className="widgets">
            <Widget  type="user"/>
            <Widget type="order" />
            <Widget  type="earning"/>
            <Widget  type="balance"/>
          </div>
          <div className="charts">
            <FeaturedChart/>
            <Chart aspect={2/1} title="Last 6 Months (Revenue)" />
          </div>
          <div className="listContainer">
            <div className="listTitle">Latest Transactions</div>
            <BasicTable />
          </div>
        </div>
    </div>
  )
}

export default Home