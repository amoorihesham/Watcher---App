import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Trending from "./pages/trending/Trending";
import MoviePage from "./pages/moviePage/MoviePage";
import NavbarComp from "./components/navbar/NavbarComp";
import { Fragment } from "react";

function App() {
  return (
    <Fragment>
      <NavbarComp />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Trending" element={<Trending />} />
        <Route path="/Trending/:id" element={<MoviePage />} />
      </Routes>
    </Fragment>
  );
}

export default App;
