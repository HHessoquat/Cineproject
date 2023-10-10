import MovieCard from '../../components/MovieCard';
import {useState, useEffect} from 'react'

function MoviesManagement() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://jeremydequeant.ide.3wa.io:9000/api/movie', {
          method: 'GET',
          headers: {
            accept: 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Erreur réseau');
        }

        const data = await response.json();
        setMovies(data.content);
      } catch (error) {
        console.error('Erreur:', error);
      }
    }

    fetchData();
  }, []);
  
  return (
    <>
      {movies.map(movie => (<MovieCard key={movie.id} movie={movie} />)
        
      )}
      
    </>
  );
}

export default MoviesManagement;
