import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Card from "react-bootstrap/Card";
const Trending = () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      authorization:
        "bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMmFmNjljNTc1OWU3MDE2NGM5ZGE1ZDM0YTFiZmViMiIsInN1YiI6IjY0Nzc0ZGE0MTJjNjA0MDEwMDE4MjFmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sEcG5GO-yJ0_0ugklKJWjFnl-ipWjPIHVkaMGPcr_uY",
    },
  };
  const [moviesList, setMoviesList] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,options)
      .then((res) => {
       
        setMoviesList(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const nextPageHandler = (pagenumber) => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pagenumber}`,
        options
      )
      .then((res) => {
        setMoviesList(res.data.results);
        setPage(page + 1);
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const prevPageHandler = (pagenumber) => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${pagenumber}`,
        options
      )
      .then((res) => {
        setMoviesList(res.data.results);
        setPage(page - 1);
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="Trending py-5">
      <Container>
        <div className="row g-5">
          {moviesList.map((movie) => {
            return (
              <div className="col-md-6 col-xl-4 col-xxl-3" key={movie.id}>
                <Card
                  style={{ width: "18rem" }}
                  className="bg-dark text-white card"
                >
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w500${
                      movie.backdrop_path || movie.poster_path
                    }`}
                  />
                  <Card.Body>
                    <Card.Title className="title">
                      {movie.title || movie.original_title}
                    </Card.Title>
                    <Card.Text className="description">
                      {movie.overview}
                    </Card.Text>
                    <Card.Text className="d-flex align-items-center justify-content-between fw-bold">
                      {movie.release_date}
                      <span className="d-flex align-items-center justify-content-center">
                        <FaStar className="fs-6 star me-1"></FaStar> |{" "}
                        <span className="fw-bold ms-1">
                          {movie.vote_average}
                        </span>
                      </span>
                    </Card.Text>

                    <Link
                      to={`/Trending/${movie.id}`}
                      className="btn btn-primary"
                    >
                      Details
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
        <div className="mt-5 d-flex align-items-center justify-content-between w-50 m-auto">
          <button
            className="btn btn-info"
            onClick={() => {
              prevPageHandler(page);
            }}
          >
            Prev
          </button>
          <button
            className="btn btn-info"
            onClick={() => {
              nextPageHandler(page);
            }}
          >
            Next
          </button>
        </div>
      </Container>
    </div>
  );
};

export default Trending;
