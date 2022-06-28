import React from 'react'
import "./featuredproperties.css"
import useFetch from "../hooks/useFetch"
const FeaturedProperties = () => {
  const {data, loading , error, reFetch} = useFetch("/hotels?featured=true&limit=4");

  return (
    <div className="fp">

    {loading ? <div>Loading...</div> : (
      <>

      {data.map((item,i ) => (
        <div className="fpItem" key={i}>
      <img
        src={item.photos[0]}
        alt=""
        className="fpImg"
      />
      <span className="fpName">{item.name}</span>
      <span className="fpCity">{item.city}</span>
      <span className="fpPrice">{item.cheapestPrice}</span>
      {item.rating && <div className="fpRating">
        <button>{item.name}</button>
        <span>{item.name}</span>
      </div>}
    </div>
      ))}
              
      </>
    )}
    
   
  </div>
  )
}

export default FeaturedProperties