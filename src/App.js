import React, { Component } from "react";
import Movies from "./Components/Movies";
import Generes from "./Components/Generes";
import ApiKey from "./API/Key";

class App extends Component {
  state = {
    movies: [],
    selectedGenre: {
      id: "",
      name: "Popular",
    },
  };

  async fetchMovies(genre) {
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
      this.setState({ movies: data.results });
      console.log(data.results);
    } catch (error) {
      console.log(error.message);
    }
  }

  componentDidMount() {
    this.fetchMovies();
  }
  componentDidUpdate() {
    this.fetchMovies(this.state.selectedGenre);
  }

  handelSelectGenre = (genre) => {
    this.setState({ selectedGenre: genre });
  };

  render() {
    return (
      <div className="App">
        <div className="row">
          <div className="container-fluid col p-5">
            <Generes
              selectedGenre={this.state.selectedGenre}
              onSelecte={this.handelSelectGenre}
            />
          </div>
          <div className="container-fluid col-9 p-4">
            <Movies
              movies={this.state.movies}
              selectedGenre={this.state.selectedGenre}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
