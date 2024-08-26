import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMovies, getGenres } from '../store';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import "./Movies.css"
import Navbar from '../components/Navbar';
import Slider from '../components/Slider';
import NotAvailable from '../components/NotAvailable';
import SelectGenre from '../components/SelectGenre';

function Movies() {
  const [isScrolled, setisScrolled] = useState(false);
  const navigate = useNavigate();
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGenres());
  }, []);
  
  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "movie" }));
  }, [genresLoaded]);

  window.onscroll = () => {
    setisScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
   };

    onAuthStateChanged(firebaseAuth, (currentUser) => {
    /*if (currentUser) navigate("/");*/
  });

  return (
      <div className='container'>
          <div className="navbar">
              <Navbar isScrolled={isScrolled} />
          </div>
          <div className="data">
              <SelectGenre genres={genres} type="movie" />
              {
                  movies.length ?<Slider movies={movies} />:<NotAvailable />
              }
          </div>
    </div>
  )
}

export default Movies