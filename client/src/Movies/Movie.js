import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

const initialMovie = {
  title: '',
  director: '',
  metascore: '',
  stars: []
};

function Movie({ addToSavedList, setMovieList }) {
  const [movie, setMovie] = useState(initialMovie);

  // use url to get ID
  const params = useParams();
  const id = params.id;

  // use history to push
  const { push } = useHistory();

  const fetchMovie = (id) => {
    console.log(id);
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const handleDelete = e => {
    e.persist();
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        setMovieList(props => props.filter(movie => movie.id !== res.data))
        push("/");
      })
      .catch(err => console.log(err));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(id);
  }, [id]);

  if (!id) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div className="update-button" onClick={() => push(`/update-movie/${movie.id}`, movie)}>
        Update
      </div>
      <div className="delete-button" onClick={handleDelete}>
        Delete
      </div>
    </div>
  );
}

export default Movie;
