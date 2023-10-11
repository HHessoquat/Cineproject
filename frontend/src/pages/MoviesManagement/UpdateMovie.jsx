import MovieForm from './MovieManagerForm.jsx';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';


function UpdateMovie() {
    const [movieData, setMovieData] = useState();
    const {idMovie} = useParams();
    
    useEffect(()=>{
        async function fetchMovieDatas() {
                try {
                    const response = await fetch(`http://jeremydequeant.ide.3wa.io:9000/api/movie/${idMovie}`, {
                        method: 'GET',
                        headers: {
                            accept: 'application/json'
                        }
                    })
                    
                    if (!response.ok) {
                        throw new Error('erreur lors de la récupération du film');
                    }
                    
                    const movieDatas = await response.json();
                    setMovieData(movieDatas);
                    
                } catch (error) {
                    console.log(error);
                    }
                }
            fetchMovieDatas();
    }, []);
    
    console.log(movieData);
    return(
        <MovieForm update={true} previousMovieData={movieData} idMovie={idMovie} />
        )
}
export default UpdateMovie;