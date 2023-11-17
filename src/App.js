import { useState, useEffect } from "react";
import Movies from "./Components/Movies";
import Generes from "./Components/Generes";
import ApiKey from "./API/Key";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [selectedGender, setSelectedGender] = useState({
    id: "",
    name: "Popular",
  });

  async function fetchMovies(genre) {
    const url1 = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${ApiKey}`;
    try {
      let response;
      if (genre) {
        const url2 = `https://api.themoviedb.org/3/discover/movie?with_genres=${genre.id}&language=en-US&api_key=${ApiKey}`;
        response = await fetch(url2);
      } else {
        response = await fetch(url1);
      }
      const data = await response.json();
      setMovies(data.results);
      console.log(data.results);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    fetchMovies(selectedGender);
  }, [selectedGender]);

  const handleSelectGenre = (genre) => {
    setSelectedGender(genre);
  };

  return (
    <div className="App">
      <div className="row">
        <div className="container-fluid col p-5">
          <Generes
            selectedGenre={selectedGender}
            onSelecte={handleSelectGenre}
          />
        </div>
        <div className="container-fluid col-9 p-4">
          <Movies movies={movies} selectedGenre={selectedGender} />
        </div>
      </div>
    </div>
  );
};

export default App;
