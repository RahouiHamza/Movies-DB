import React, { useEffect, useState } from "react";
import ApiKey from "../API/Key";
import "./card.css";

const ShowDetails = ({ id, hideDetails }) => {
    const [movie, setMovie] = useState({});

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=${ApiKey}`
                );
                const data = await response.json();
                setMovie(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching movie details:", error.message);
            }
        };

        fetchMovieDetails();
    }, [id]);

    // Function to calculate the percentage style for vote_average
    const calculateVotePercentage = (voteAverage) => {
        return (voteAverage / 10) * 100;
    };

    // Function to format the runtime as "0h 0m"
    const formatRuntime = (runtime) => {
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;
        return `${hours}h ${minutes}m`;
    };

    return (
        <div
            className="show-details-container"
            style={{
                background: `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}') center/cover no-repeat fixed rgba(0, 0, 0, 0.7)`,
            }}
        >
            <button className="close-button" onClick={hideDetails}>
                X
            </button>
            {movie && (
                <div className="movie-details">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="movie-poster"
                    />
                    <div className="text-details">
                        <h2 className="text-black">{movie.title}</h2>
                        {movie.tagline && <p className="tagline">{movie.tagline}</p>}
                        <p className="overview">{movie.overview}</p>
                        <div className="additional-details">
                            <p>
                                <strong>Genres:</strong>{" "}
                                {movie.genres &&
                                    movie.genres.map((genre) => genre.name).join(", ")}
                            </p>
                            <p>
                                <strong>Release Date:</strong> {movie.release_date}
                            </p>
                            {movie.runtime && (
                                <p>
                                    <strong>Runtime:</strong> {formatRuntime(movie.runtime)}
                                </p>
                            )}
                            {movie.vote_average && (
                                <p>
                                    <strong>Vote Average:</strong>{" "}
                                    {calculateVotePercentage(movie.vote_average).toFixed(1)}%
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowDetails;
