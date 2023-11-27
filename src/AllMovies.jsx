import { useState, useEffect } from "react";
import Movies from "./Components/Movies";
import Generes from "./Components/Generes";
import ApiKey from "./API/Key";
import NavBar from "./Components/NavBar";

const AllMovies = () => {
    const [movies, setMovies] = useState([]);
    const [selectedGender, setSelectedGender] = useState({
        id: "",
        name: "Popular",
    });
    const [search, setSearch] = useState("");

    async function fetchMovies(genre) {
        let url;
        if (search) {
            url = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1&api_key=${ApiKey}`;
        } else {
            url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${ApiKey}`;
            if (genre) {
                url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genre.id}&language=en-US&api_key=${ApiKey}`;
            }
        }

        try {
            const response = await fetch(url);
            const data = await response.json();
            setMovies(data.results);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchMovies();
    }, [search]);

    useEffect(() => {
        fetchMovies(selectedGender);
    }, [selectedGender]);

    const handleSelectGenre = (genre) => {
        setSelectedGender(genre);
        console.log(genre)
    };

    return (
        <div className="App">
            <NavBar SetSearch={setSearch} search={search} />
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

export default AllMovies;
