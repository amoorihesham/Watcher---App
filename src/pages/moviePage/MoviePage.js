import React, { useEffect, useState } from "react";
import "./moviePage.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/esm/Container";
import YouTube from "react-youtube";

const MoviePage = (props) => {
  const opts = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 0,
      controls: 1,
    },
  };
  const currentId = useParams();

  const [movie, setMovieData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${currentId.id}?language=en-US`,
        {
          params: {
            api_key: "f2af69c5759e70164c9da5d34a1bfeb2",
            append_to_response: "videos",
          },
        }
      )
      .then(async (res) => {
        setMovieData(res.data);
        let genres = res.data.genres;
        let actGenres = genres.map((gen) => {
          return gen.name;
        });
        setGenres(actGenres);
        const allVideos = await res.data.videos.results;
        let trailer = await allVideos.find(
          (vid) => vid.name === "Official Trailer"
        );
        if (trailer === undefined) {
          trailer = allVideos[0];
          setVideos(trailer);
        } else {
          setVideos(trailer);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [videos]);

  return (
    <div className="moviePage py-3">
      <Container>
        <div className="row g-5">
          <div className="col-md-8 col-xl-8 col-xxl-8">
            <div className="cardShow h-100 text-white">
              <YouTube videoId={videos.key} opts={opts} />
            </div>
          </div>
          <div className="col-md-4 col-xl-4 col-xxl-4">
            <div className="cardShow border border-1 border-dark-subtle p-3">
              <div className="text-white border-bottom border-1 border-dark-subtle py-2 mb-3 fw-bold">
                Movie Name:{" "}
                <span className="fw-normal text-white-50 fs-4 ms-2 d-inline-block">
                  {movie.original_title || movie.title}
                </span>
              </div>
              <div className="text-white description border-bottom border-1 border-dark-subtle py-2 mb-3 fw-bold">
                Movie overView:{" "}
                <span className="fw-light text-white-50 fs-6 mt-1 d-inline-block">
                  {movie.overview}
                </span>
              </div>
              <div className="text-white description border-bottom border-1 border-dark-subtle py-2 mb-3 fw-bold">
                Movie Relase:{" "}
                <span className="fw-normal text-white-50 fs-4 ms-2 d-inline-block">
                  {movie.release_date}
                </span>
              </div>

              <div className="text-white description border-bottom border-1 border-dark-subtle py-2 mb-3 fw-bold">
                Movie Tagline:{" "}
                <span className="fw-normal text-white-50 fs-6 mt-1 d-inline-block">
                  {movie.tagline || "No Tagline"}
                </span>
              </div>
              <div className="text-white description border-bottom border-1 border-dark-subtle py-2 mb-3 fw-bold">
                Movie Rating:{" "}
                <span className="fw-bold text-warning fs-3 ms-2 d-inline-block">
                  {Number(movie.vote_average).toFixed(2)}
                </span>
              </div>
              <div className="text-white description fw-bold">
                {genres.map((genre) => {
                  return (
                    <span
                      className="me-2 mb-2 bg-success py-1 px-2 text-center rounded d-inline-block"
                      key={genre}
                    >
                      {genre}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MoviePage;
