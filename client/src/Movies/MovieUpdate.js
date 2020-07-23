import React, { useState, useEffect } from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";
import axios from "axios";

// title, director, metascore, stars

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: []
};

const UpdateForm = ({ setMovieList }) => {
    const location = useLocation();
    const params = useParams();
    const { push } = useHistory();
    const [movie, setMovie] = useState(initialMovie);
    useEffect(() => {
      if (location.state) {
        setMovie(location.state);
      } else {
        axios
          .get(`http://localhost:5000/api/movies/${params.id}`)
          .then(res => setMovie(res.data))
          .catch(err => console.log(err));
      }
    }, []);
  
    const changeHandler = ev => {
      ev.persist();
      setMovie({
        ...movie,
        [ev.target.name]: ev.target.value
      });
    };
  
    const handleSubmit = e => {
      e.preventDefault();
      console.log(movie)

      // if stars turned to a string
      if (typeof(movie.stars) === 'string') {
        console.log("it's a string")
        // reformat to split stars into an array
        const newMovie = {...movie, stars: movie.stars.split(',')}
        // make put req with newMovie
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, newMovie)
            .then(res => {
            push(`/movies/${movie.id}`);
            })
            .catch(err => console.log(err));
      } else { // if stars wasn't changed, continue as normal
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
            push(`/movies/${movie.id}`);
            })
            .catch(err => console.log(err));
      }
      
    };
  
    return (
      <div className='update-form'>
        <h2 className='update-h2'>Update Movie</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
                type="text"
                name="title"
                onChange={changeHandler}
                value={movie.title}
            />
          </label>
  
          <label>
            Director:
            <input
                type="text"
                name="director"
                onChange={changeHandler}
                value={movie.director}
            />
          </label>

  
          <label>
            Metascore:
            <input
                type="integer"
                name="metascore"
                onChange={changeHandler}
                value={movie.metascore}
            />
          </label>

          <label>
            Actors:
            <input
                type="text"
                name="stars"
                onChange={changeHandler}
                value={movie.stars}
            />
          </label>
          

          <button className="md-button form-button">Submit</button>
        </form>
      </div>
    );
  };
  
  export default UpdateForm;
  