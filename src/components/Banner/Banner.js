import React, { useEffect, useState } from "react";
import "./Banner.css";
import categories, { getMovies } from "../../api";

function Banner() {
  const [movie, setMovie] = useState({});

  const fetchRandomMovie = async () => {
    try {
      const netflixOriginalsCategory = categories.find(
        (category) => category.name === "netflixOriginals"
      );
      const data = await getMovies(netflixOriginalsCategory.path);
      const movies = data?.results;
      const randomIndex = Math.floor(Math.random() * data.results.length);
      setMovie(movies[randomIndex]);
    } catch (error) {
      console.error("Banner fetchRandomMovie error: ", error);
    }
  };

  useEffect(() => {
    fetchRandomMovie();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner-container"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        roundPosition: "center-center",
      }}
    >
      <div className="banner-content">
        <h1 className="banner-title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner-button-container">
          <button className="banner-button">Assistir</button>
          <button className="banner-button">Minha Lista</button>
        </div>
        <h1 className="banner-description">{truncate(movie?.overview)}</h1>
      </div>
    </header>
  );
}

export default Banner;
