import React, { useState } from 'react';
import logo from "../assets/logo.png"
import { Link, useNavigate } from 'react-router-dom';
import { FaPowerOff, FaSearch } from 'react-icons/fa';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import "./Navbar.css";

export default function Navbar({ isScrolled }) {
  const navigate = useNavigate();
  const links = [
    { name: "Home", link: "/" },
    { name: "Tv Shows", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/my-list" }
  ];

  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (!currentUser) navigate("/login");
  });

    
     const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search?q=${searchQuery.trim()}`);
    }
  };

  return (
    <>
      <nav className={`flex ${isScrolled ? "scrolled" : ""}`}>
        <div className="left flex a-center">
          <div className="brand flex a-center j-center">
            <img src={logo} alt='logo' />
          </div>
          <ul className="links flex">
            {links.map(({ name, link }) => (
              <li key={name}>
                <Link to={link}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="right flex a-center">
          <div className={`search ${showSearch ? "show-search" : ""}`}>
            <button onFocus={() => setShowSearch(true)} onBlur={() => {
              if (!inputHover) setShowSearch(false);
            }}>
              <FaSearch />
            </button>
            <input
              type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch} // Trigger search on Enter key press
            onMouseEnter={() => setInputHover(true)}
            onMouseLeave={() => setInputHover(false)}
            onBlur={() => {
              setShowSearch(false);
              setInputHover(false);
            }}
            />
          </div>
          <button onClick={() => signOut(firebaseAuth)}>
            <FaPowerOff />
          </button>
        </div>
      </nav>
    </>
  );
}

