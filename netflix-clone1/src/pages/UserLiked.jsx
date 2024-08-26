import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserLikedMovies } from '../store';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import styled from 'styled-components';

export default React.memo(function UserLikedList() {
  const [isScrolled, setisScrolled] = useState(false);
  const navigate = useNavigate();
  const movies = useSelector((state) => state.netflix.movies);
  const [email, setEmail] = useState(undefined);

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) setEmail(currentUser.email);
    else navigate("/login");
  });

  const dispatch = useDispatch();
  useEffect(() => {
      if (email) {
          dispatch(getUserLikedMovies(email));
    }
  }, [email]);
  
  window.onscroll = () => {
    setisScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
   };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="content">
           <h1>My List</h1>
           <div className="column">
             <div className="grid flex">
               {movies.map((movie, index) => {
                  return <Card movieData={movie} index={index} key={movie.id} isLiked={true} />
                })}
             </div>
      </div>  
      </div>
    </Container>
  )
})


const Container = styled.div`
  .content {
    margin:2.3rem;
    margin-top: 8rem;
    }  

    h1 {
      margin-left:3rem;
    }
   
    .grid {
      flex-wrap:wrap;
      gap: 2rem;

}
`;

