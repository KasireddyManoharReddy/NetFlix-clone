import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Netflix from "./pages/Netflix";
import Player from "./pages/player";
import Movies from "./pages/Movies";
import TvShows from "./pages/TvShows";
import UserLikedList from "./pages/UserLiked";
import SearchResultsPage from "./components/SearchResults";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />{" "}
        <Route path="/signup" element={<SignUp />} />{" "}
        <Route path="/" element={<Netflix />} />{" "}
        <Route path='/player/:id' element={<Player />} />{" "}
        <Route path="/movies" element={<Movies />} />{" "}
        <Route path="/tv" element={<TvShows />} />{" "}
        <Route path="/my-list" element={<UserLikedList />} />{" "}
        <Route path="/search" element={<SearchResultsPage />} />{" "}
      </Routes>{" "}
    </BrowserRouter>
  );
}

export default App;
