import React, { useEffect, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import './Player.css';
import { useNavigate, useParams } from 'react-router-dom';

export default function Player() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [apiData1, setapiData1] = useState({
        key: ""
    });

    const [apiData2, setapiData2] = useState({
        key: ""
    });

   const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NjkzYjc1ZTMyMzAzOTc3NTc1MTc3NWVjZGMxNGE1NSIsIm5iZiI6MTcyMTM2MTYzMC4zMzA5MTUsInN1YiI6IjY0N2VjNWEyY2NkZTA0MDBmYmNlZWQ2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N5eAe2qa1w-XGcSRRq6xI-Bq0jBqr-yvOm3o3fpCKd0`
  }
};


    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)    
      .then(response => response.json())
      .then(response => setapiData1(response.results[0]))
      .catch(err => console.error(err));
    }, []); // Empty dependency array to prevent infinite loop

     useEffect(() => {
        fetch(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`, options)    
      .then(response => response.json())
      .then(response => setapiData2(response.results[0]))
      .catch(err => console.error(err));
    }, []);

    return (
        
            <div className="player">
                <div className="back">
                    <BsArrowLeft onClick={() => navigate(-2)} />
                </div>
                {apiData2.key ? (
                    <iframe 
                        src={`https://www.youtube.com/embed/${apiData2.key}`} 
                        title={apiData2.name} 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen 
                    ></iframe>
                ) : (
                    <iframe 
                        src={`https://www.youtube.com/embed/${apiData1.key}`} 
                        title={apiData1.name} 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen 
                    ></iframe>
                )}
            </div>
       
    );
}

