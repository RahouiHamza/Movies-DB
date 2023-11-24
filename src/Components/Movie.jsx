import { useState } from "react";
import "./card.css";
import ShowDetails from "./ShowDetails";
import { Link } from "react-router-dom";

const Movie = ({ movie }) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => setShowDetails(!showDetails);

    return (
            <div className="col-md-6 col-lg-4 col-xl-3 d-flex mb-4 ">
                <Link to={`/movies/${movie.id}`} style={{textDecoration:"none"}}>
                <div className="card" onClick={toggleDetails}>
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt=""
                        className="card-img-top"
                    />
                    <div className="card-body">
                        <h5 className="card-title">
                            {movie?.title || movie?.original_title || movie?.name}
                        </h5>
                        <p className="card-text" style={{ lineHeight: "1.4" }}>
                            {movie.overview.length > 150
                                ? movie.overview.split(" ").slice(0, 20).join(" ") + "..."
                                : movie.overview
                            }
                        </p>
                        {movie.media_type && (
                            <p className="card-text para" style={{ marginTop: "1rem" }}>
                                <strong>Media Type:</strong> {movie.media_type}
                            </p>
                        )}
                        {movie.release_date && (
                            <p className="card-text para">
                                <strong>Release Date:</strong> {movie.release_date}
                            </p>
                        )}
                    </div>

                </div>
                </Link>
                <div className={`overlay ${showDetails ? "active" : ""}`} onClick={toggleDetails}>
                {showDetails && <ShowDetails />}
                </div>
            </div>
            
    );
};

export default Movie;
