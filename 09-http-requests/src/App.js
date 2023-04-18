import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newMovie, setNewMovie] = useState(false); // Da li je dodat novi film

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    // movies je node name (moze bilo koji), .json je firebase specific keyword i neophodan je

    try {
      const response = await fetch(
        "https://react-http-80959-default-rtdb.europe-west1.firebasedatabase.app/movies.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      setNewMovie(true); // Ako je uspjesno fetchan, setaj state

      const data = await response.json();
      console.log(data);

      const loadedMovies = [];
      /* U loadedMovies pushamo objekat {} sa standardnim movie properties
        Ne mozemo to uraditi bez for-in i data[key] jer su object properties
        doslovno: NP4RczLPKqix46XhIB_, pa im trebamo drugacije pristupiti. */

      /* U for-in "key" predstavlja pojedinacne imena varijabli u objektima,
      pa stoga data[key] je isto ko i data.key (bracket notation) */

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
    setNewMovie(true);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler, newMovie]); // Ako je novi film dodat (newMovie), opet ce se fetchati lista

  // Umjesto "newMovie" nije moglo "movies", jer:
  /* 1. fetchat ce se novi film, dakle pozvat ce funkcija unutar useEffect (fetchMoviesHandler()) 
     2. fetchMoviesHandler() ce dodati novi film, pa samim tim promijeniti movies,
     3. Posto je movies promijenjen, opet ce se pozvati fetchMoviesHandler()
     4. Stvoriti ce se infinite loop
  */

  async function addMovieHandler(movie) {
    const response = await fetch(
      "https://react-http-80959-default-rtdb.europe-west1.firebasedatabase.app/movies.json",
      {
        method: "POST", // po defaultu je "GET"
        body: JSON.stringify(movie), // Pretvori movies objekat u .json format, neophodan za bazu
        headers: {
          "Content-Type": "application/json", //
          // Cesto je potreban (ne u Firebase), opisuje content koji se salje
        },
      }
    );

    const data = await response.json();
    console.log(data);
  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
