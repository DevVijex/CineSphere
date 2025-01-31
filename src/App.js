import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "./App.css";
import SearchIcon from "./search.svg";

const API_URL = "https://omdbapi.com?apikey=36848b77";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem("lastSearch") || ""
  );

  const searchMovies = async (title) => {
    if (!title.trim()) return; // Prevent empty search requests

    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
        localStorage.setItem("lastSearch", title); // Save last search term
      } else {
        setMovies([]); // No results
        console.error("No movies found:", data.Error);
        localStorage.removeItem("lastSearch"); // Clear stored search
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]); // Clear movies if there's an error
    }
  };

  useEffect(() => {
    const lastSearch = localStorage.getItem("lastSearch");
    if (lastSearch) {
      searchMovies(lastSearch); // Reload last searched movie
    } else {
      searchMovies("Spiderman"); // Default movie search
    }
  }, []);

  return (
    <div className="app">
      <h1>CineSphere</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;






































// import React, { useState, useEffect } from "react";
// import MovieCard from "./MovieCard";
// import "./App.css";
// import SearchIcon from "./search.svg";

// const API_URL = "https://omdbapi.com?apikey=36848b77";

// const App = () => {
//   const [movies, setMovies] = useState([]);
//   const [searchTerm, setSearchTerm] = useState(
//     localStorage.getItem("lastSearch") || ""
//   );

//   const searchMovies = async (title) => {
//     if (!title.trim()) return; // Prevent empty search requests

//     try {
//       const response = await fetch(`${API_URL}&s=${title}`);
//       const data = await response.json();

//       if (data.Search) {
//         setMovies(data.Search);
//         localStorage.setItem("lastSearch", title); // Save last search term
//       } else {
//         setMovies([]);
//         localStorage.removeItem("lastSearch"); // Clear storage if no results
//       }
//     } catch (error) {
//       console.error("Error fetching movies:", error);
//     }
//   };

//   useEffect(() => {
//     const lastSearch = localStorage.getItem("lastSearch");
//     if (lastSearch) {
//       searchMovies(lastSearch); // Reload last searched movie
//     } else {
//       searchMovies("Spiderman"); // Default movie search
//     }
//   }, []);

//   return (
//     <div className="app">
//       <h1>CineSphere</h1>

//       <div className="search">
//         <input
//           placeholder="Search for movies"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <img
//           src={SearchIcon}
//           alt="search"
//           onClick={() => searchMovies(searchTerm)}
//         />
//       </div>

//       {movies.length > 0 ? (
//         <div className="container">
//           {movies.map((movie) => (
//             <MovieCard key={movie.imdbID} movie={movie} />
//           ))}
//         </div>
//       ) : (
//         <div className="empty">
//           <h2>No movies found</h2>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;
















