import {useState} from 'react';
import SearchMovie from '../../components/Movies/SearchMovie';
import CreateMovieForm from '../../components/Movies/MovieManagerForm';

function MoviesManagement() {
  const [action, setAction] = useState(0);
  const [allMovies, setAllMovies] = useState([]);
  const [movie, setMovie] = useState({});
    
  function handleChange(e) {
      setAction(Number(e.target.value));
  }


  return (
    <main>
      <form onSubmit={(e) => e.preventDefault()}>
            <label>
              <input
                type="radio"
                name="action"
                value={0}
                checked={action === 0}
                onChange={handleChange}
              />
              Chercher film
            </label>
      
            <label>
              <input
                type="radio"
                name="action"
                value={1}
                checked={action === 1}
                onChange={handleChange}
              />
              Ajouter un film
            </label>
      </form>
      {action === 0 && <SearchMovie 
                        allMovies={allMovies} 
                        setAllMovies={setAllMovies}
                        movie={movie}
                        setMovie={setMovie}
                      />}
      {action === 1 && <CreateMovieForm />}
    </main>
  );
}

export default MoviesManagement;
