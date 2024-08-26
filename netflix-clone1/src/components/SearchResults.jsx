import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from '../components/Card'; // Import the Card component
import './SearchResults.css';
import { FaArrowLeft } from 'react-icons/fa'; // Import a back arrow icon

export default function SearchResults() {
    const [movies, setMovies] = useState([]);
    const [tv, settv] = useState([]);
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate hook
  const searchQuery = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    if (searchQuery) {
        fetchMovies(searchQuery);
    }
  }, [searchQuery]);

  const fetchMovies = async (query) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=9693b75e323039775751775ecdc14a55&query=${query}`
      );
        setMovies(response.data.results);
        const response1 = await axios.get(
        `https://api.themoviedb.org/3/search/tv?api_key=9693b75e323039775751775ecdc14a55&query=${query}`
        );
        settv(response1.data.results);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    }
    };
    

  return (
    <div className="search-results-container">
      <div className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft className="back-arrow" /> {/* Back arrow icon */}
      </div>
      <h1>Search Results for: "{searchQuery}"</h1>
      <div className="movies-grid">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Card
              movieData={{
                id: movie.id,
                name: movie.original_title?movie.original_title:movie.original_name,
                image:  movie.backdrop_path,
                genres: movie.genre_ids, // Assuming you have genre IDs
                  }}
                  key={movie.id}
            />
          ))
        ) : (
          <p>No results found</p>
              )}
              {tv.length > 0 ? (
                  tv.map((movie) => (
            <Card
              movieData={{
                id: movie.id,
                name: movie.original_title?movie.original_title:movie.original_name,
               image:  movie.backdrop_path,
                genres: movie.genre_ids, // Assuming you have genre IDs
                  }}
                  key={movie.id}
            />
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}



