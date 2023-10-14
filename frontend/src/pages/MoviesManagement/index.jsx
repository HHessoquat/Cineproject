import MovieCard from '../../components/MovieCard';
import {useState, useEffect} from 'react';
import { fetchMoviesData } from '../../features/moviesManagement/api.js'

function MoviesManagement() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMoviesData(setMovies);
  }, []);
  
  return (
    <>
      {movies.map(movie => (<MovieCard key={movie.id} movie={movie} />)
        
      )}
      
    </>
  );
}

export default MoviesManagement;
