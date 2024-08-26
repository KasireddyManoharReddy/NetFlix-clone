import React, { useState } from 'react'
import "./Card.css"
import { useNavigate } from 'react-router-dom';
import video from "../assets/video.mp4"
import { IoPlayCircleSharp } from 'react-icons/io5'
import { RiThumbUpFill, RiThumbDownFill } from 'react-icons/ri'
import { BsCheck } from 'react-icons/bs'
import { AiOutlinePlus } from 'react-icons/ai'
import { BiChevronDown } from 'react-icons/bi'
import { firebaseAuth } from '../utils/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import axios from 'axios';
import { removeMovieFromLiked } from '../store';
import { useDispatch } from 'react-redux';

export default React.memo(function Card({ movieData, isLiked = false }) {
  const [isHovered, setisHovered] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState(undefined);
   const dispatch = useDispatch();

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);
    else navigate("/login");
  });

  const addToList = async () => {
    try {
      await axios.post("http://localhost:5004/api/user/add", { email, data: movieData });
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className='Container' onMouseEnter={()=>setisHovered(true)} onMouseLeave={()=>setisHovered(false)}>
      <img src={`http://image.tmdb.org/t/p/w500${movieData.image}`} alt="movie" />
      {
        isHovered && (
          <div className="hover">
            <div className="image-video-container">
              <img src={`http://image.tmdb.org/t/p/w500${movieData.image}`} alt="movie" onClick={() => navigate(`/player/${movieData.id}`)} />
              <video src={video} autoPlay loop muted onClick={() => navigate(`/player/${movieData.id}`)} />
            </div>
            <div className="info-container flex columnn">
              <h3 className='name' onClick={() => navigate(`/player/${movieData.id}`)}>{movieData.name}</h3>
              <div className="icons flex j-between">
                <div className="controls flex">
                  <IoPlayCircleSharp title='play' onClick={() => navigate(`/player/${movieData.id}`)} />
                  <RiThumbUpFill title='Like' />
                  <RiThumbDownFill title='DisLike' />
                  {
                    isLiked ? 
                      (<BsCheck title='Remove From List' onClick={() =>dispatch(removeMovieFromLiked({movieId:movieData.id,email}))} />) :
                      (<AiOutlinePlus title='Add To My List' onClick={addToList}/>)
                  }
                </div>
                <div className="info">
                  <BiChevronDown title='More Info'/>
                </div>
              </div>
              <div className="genres flex">
                <ul className='flex'>
                  {movieData.genres.map((genre) => {
                    <li key={genre}>{genre}</li>
                  })}
                </ul>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
})
