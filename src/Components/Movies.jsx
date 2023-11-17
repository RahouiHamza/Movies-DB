import React from "react";
import Movie from "./Movie";

const Movies = ({ movies , selectedGenre }) => {
    return (
        <div className="row g-4">
            <h3 className="display-4">{selectedGenre.name } Movies</h3>
            {
                movies.map((movie) => (
                    <Movie key={movie.id} movie={movie} />
                ))
            }
        </div>
        
    );
}

export default Movies;
