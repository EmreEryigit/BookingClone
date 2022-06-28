import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import "./singlehotel.css";
import MailList from "../components/MailList";
import Footer from "../components/Footer";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { SearchContext } from "../context/SearchContext";
import { AuthContext } from "../context/AuthContext";
import Reserve from "../components/Reserve";
const SingleHotel = () => {
  const navigate = useNavigate()
  const [slideNumber, setSlideNumber] = useState(0);
  const [openSlide, setOpenSlide] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const params = useParams();
  const { data, loading, error, reFetch } = useFetch(`/hotels/${params.id}`);
  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpenSlide(true);
  };

  
  const {dates, options} = useContext(SearchContext)
  console.log(dates)

  const PERDAY = 1000 * 60* 60 *24
  function dayDifference(date1,date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(timeDiff / PERDAY);
  }
 const days = dayDifference(dates[0].startDate,dates[0].endDate)
  const handleMove = (direction) => {
    let newSliderNumber;
    if (direction === "l") {
      newSliderNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSliderNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }
    console.log(days)
    setSlideNumber(newSliderNumber);
  };
  const {user} = useContext(AuthContext)

  const handleClick = () => {
    if(user) {
      setOpenModal(true)
    }else {
      navigate("/login")
    }
  }
  return (
    <>
      <Navbar />
      <Header type="list" />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="hotelContainer">
          {openSlide && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpenSlide((prev) => !prev)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}
          <div className="hotelWrapper">
            <button className="bookNow" onClick={handleClick} >Reserve or Book Now!</button>
            <h1 className="hotelTitle"> {data.name}</h1>
            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>
            <span className="hotelDistance">
              {data.distance}m away from your location
            </span>
            <span className="hotelPriceHighlight">
              Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
            </span>
            <div className="hotelImages">
              {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper">
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsText">
                <h1 className="hotelTitle">{data.title}</h1>
                <p className="hotelDesc">
                 {data.desc}
                </p>
              </div>
              <div className="hotelDetailsPrice">
                {" "}
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>${data.cheapestPrice * days * options.room}</b> ({days} nights)
                </h2>
                <button>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
          {openModal && <Reserve  setOpen={setOpenModal} hotelId={params.id} />}
        </div>
      )}
    </>
  );
};

export default SingleHotel;
