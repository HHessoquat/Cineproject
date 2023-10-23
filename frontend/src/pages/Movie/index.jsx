import {useState, useEffect} from 'react';
import  { useParams } from 'react-router-dom';
import { fetchMovieData} from '../../features/moviesManagement/api.js'
import {parseDate} from '../../utils/dateFormat/parseDate.js';
import { fetchSession } from '../../features/movieSession/api.js';

function Movie() {
    const {idMovie} = useParams();
    const [movie, setMovie] = useState({});
    const [sessions, setSessions] = useState([]);
    const [showFullSynopsis, setShowFullSynopsis] = useState(false);
    const printSynopsis = movie.synopsis ? (showFullSynopsis ? movie.synopsis : `${movie.synopsis.slice(0, 100)}...`) : "";
    let groupedSessions = [];
    
    async function fetchData() {
        const movieResult = await fetchMovieData(idMovie);
        const newMovie = formatMovieData(movieResult);
        setMovie(newMovie);
        
        const sessionResult = await fetchSession(newMovie.id);
        const newSessions = formatSessionData(sessionResult);
        setSessions(newSessions);
        }
        
    function formatMovieData(data) {
        const dataCopy = {...data}
        const releaseDate = new Date(data.releaseDate).toLocaleString('fr-FR', {  year: 'numeric', month: 'long', day: 'numeric', });
        dataCopy.releaseDate= releaseDate;
            return dataCopy;
    }
    function formatSessionData(allSessions){
        const dataCopy  = [...allSessions];
        const formattedData = dataCopy.map((c) => {
            c.date = new Date(c.date).toLocaleString('fr-FR', {  year: 'numeric', month: 'long', day: 'numeric', });
            c.time = c.time.substring(0, 5);
            return c;
        });
        return formattedData;
    }
    
    function groupSession(){
        if (sessions) {
            groupedSessions = sessions.reduce((acc, session) => {
              if (!acc.includes(session.date)) {
                acc.push(session.date);
              }
              return acc;
            }, []);
        }
    }
    
    function printTime(date){
        console.log('passe')
        return sessions.map((c, i) => {
            if (c.date === date) {
                return <p>{c.time}</p>;
            }
        })
    }
    
    
    useEffect(() => {
            fetchData();
    }, []);
    groupSession(
        )
     
    return (
        <main>
            <article className="movieDescription">
                <img
                    className="movieCover"
                    src={movie.coverImgUrl}
                    alt={movie.coverImgAlt}
                />
                <section id="movie_info">
                    <h2 id="moviePage_title">{movie.title}</h2>
                    <aside id="movieDetail">
                        <img className="moviePoster" src={movie.poster} alt={movie.posterAlt} />
                        <ul>
                            
                            <li><span className="movieFeatureHeader">Durée : </span><span className="movieFeature"> {movie.length} minutes</span></li>
                            <li><span className="movieFeatureHeader">De : </span><span className="movieFeature">{movie.directors && movie.directors.replace(/,/g, ', ')}</span></li>
                            <li><span className="movieFeatureHeader">Avec : </span><span className="movieFeature">{movie.actors && movie.actors.replace(/,/g, ', ')}</span></li>
                            <li><span className="movieFeatureHeader">Date de sortie : </span><span className="movieFeature">{movie.releaseDate}</span></li>
                            {movie.pg && <li><span className="movieFeatureHeader">public : </span><span className="movieFeature">{movie.pg}</span></li>}
                            {movie.warnings && <li><span className="movieFeatureHeader">avertissements : </span><span className="movieFeature">{movie.warnings}</span></li>}
                        </ul>
                    </aside>
                    <p id="synopsis">{printSynopsis}</p>
                    {movie.synopsis && movie.synopsis.length > 100 &&
                        <button onClick={() => setShowFullSynopsis(!showFullSynopsis)}>
                            {showFullSynopsis ? 'Réduire' : 'Lire la suite'}
                        </button>
                    }
                    <aside className="movieSessionBtnContainer">
                        {groupedSessions.map((c,i) => {
                            console.log(c)
                            return <button class="movieSessionBtn" key= {i} onClick={() => printTime(c)}><textarea class="multi-line-Button" readOnly rows="3" value={c.replace(/ /g, '\n')} /></button>
                        })}
                    </aside>
                </section>
            </article>
            
        </main>
    );
}
export default Movie;
