import React, { useEffect, useState, useCallback } from "react";

import AddMovie from "./components/AddMovie";
import MoviesList from "./components/MoviesList";
import "./App.css";
import { darkmagenta } from "color-name";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://movie-90-default-rtdb.firebaseio.com/NewMovies.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong lodu");
      }
      const data = await response.json();

      const loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.epispde_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
          director: movieData.director,
        };
      });
      setMovies(transformedMovies);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  async function addMovieHandler(movie) {
    const response = await fetch(
      "https://movie-90-default-rtdb.firebaseio.com/NewMovies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }

  let content = <p> No Movies </p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p> {error}</p>;
  }

  if (isLoading) {
    content = <p>Loading..</p>;
  }
  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}> Movies List</button>
      </section>
      <section>
        {/* {!isLoading && movies.length > 0 && }
        {!isLoading && movies.length === 0 && !error && <p>No Movies Found</p>}
        {isLoading && <p>Lodading....</p>}
        {!isLoading && error && <p>{error}</p>} */}
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
