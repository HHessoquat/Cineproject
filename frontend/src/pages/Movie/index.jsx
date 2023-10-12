import {useState, useEffect} from 'react';
import  { useParams } from 'react-router-dom'

function Movie() {
    const {idMovie} = useParams();
    const [movie, setMovie] = useState({});
    
    useEffect(() => {

            async function fetchMovieDatas() {
                try {
                    const response = await fetch(`http://jeremydequeant.ide.3wa.io:9000/api/movie/${idMovie}`, {
                        method: 'GET',
                        headers: {
                            accept: 'application/json'
                        }
                    })
                    
                    if (!response.ok) {
                        console.log(response);
                        throw new Error('erreur lors de la récupération du film');
                    }
                    
                    const movieDatas = await response.json();
                    setMovie(movieDatas);
                    
                } catch (error) {
                    console.log(error);
                    }
                }
            fetchMovieDatas();
            }
        , []);
    function deleteMovie() {
        fetch(`http://jeremydequeant.ide.3wa.io:9000/api/movie/${idMovie}`,{
            method: 'DELETE',
            headers: {
                accept: 'application/json',
            }
            
        }).then((response) => {
            response.json()
        }).then((data) => console.log(data.message));
    }
        
    
    return (
        <>
            <h1 id="moviePage_title">{movie.title}</h1>
            <article className="movieDescription">
                <img
                    className="moviePoster"
                    src={movie.poster}
                    alt={movie.posterAlt}
                />
                <aside id="movie_info">
                    <ul>
                        <li>durée : {movie.length} minutes</li>
                        <li>De {}</li>
                        <li>Avec {}</li>
                        <li>
                            Date de sortie :
                        </li>
                    </ul>
                </aside>
                <button type='button' onClick={deleteMovie}>Supprimer</button>
            </article>
        </>
    );
}
export default Movie;
