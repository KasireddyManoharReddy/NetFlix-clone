import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import backgroundImage from "../assets/home.jpg"
import MovieLogo from "../assets/homeTitle.webp"
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import "./Netflix.css"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import Slider from "../components/Slider";


export default function Netflix() {
  const [isScrolled, setisScrolled] = useState(false);
  const navigate = useNavigate();
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGenres());
  }, []);
  
  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "all" }));
  }, [genresLoaded]);

  window.onscroll = () => {
    setisScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
   };

 


  return <div className="container1">
    <Navbar isScrolled={isScrolled} />
    <div className="hero">
      <img src={backgroundImage} alt="backgroundImage" className="background-image" />
      <div className="container">
        <div className="logo">
          <img src={MovieLogo} alt="Movie Logo" />
        </div>
        <div className="buttons flex">
          <button className="flex a-center j-center" onClick={()=>navigate("/player/66732")}><FaPlay />Play</button>
          <button className="flex a-center j-center"><AiOutlineInfoCircle />More Info</button>
        </div>
      </div>
    </div>
    <Slider movies={movies} />
  </div>;
}
