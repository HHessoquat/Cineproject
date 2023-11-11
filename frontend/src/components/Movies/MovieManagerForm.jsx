import { useState, useEffect } from 'react';
import DynamicInputList from '../Forms/DynamicInputList';
import { validateForm } from '../../features/moviesManagement/validateMovieForm.js';
import { createMovie, updateMovie } from '../../features/moviesManagement/api.js';
import { postSession, deleteSessions } from '../../features/movieSession/api.js';
import handleChange from '../../utils/formsManagement/handleChange.js';
import CreateSession from '../Forms/addSessionForm.jsx';

function MovieManagerForm({update, previousMovieData, idMovie, previousSessionsData, setAction}) {
    const [movieData, setmovieData] = useState({
        movieTitle: '',
        posterAlt: '',
        coverImgAlt: '',
        releaseDate: '',
        movieLength: 0,
        synopsis: '',
        director: [''],
        mainActors: [''],
        categories: [''],
        trailerUrl: '',
        pg: '',
        warnings: [''],
        isOnline: '0',
    });
    const [movieSessions, setMovieSessions] = useState([]);
    const [errorMsg, setErrorMsg] = useState([]);
    
    useEffect(()=> {
        if (previousMovieData) {
            const formattedData = {
                movieTitle: previousMovieData.title,
                posterAlt: previousMovieData.posterAlt,
                coverImgAlt: previousMovieData.coverImgAlt,
                movieLength: previousMovieData.length,
                synopsis: previousMovieData.synopsis,
                trailerUrl: previousMovieData.trailer,
                pg: previousMovieData.pg,
                isOnline: previousMovieData.online,
                posterUrl: previousMovieData.poster,
                coverImgUrl: previousMovieData.coverImgUrl,
            };
            formattedData.mainActors = previousMovieData.actors.split(',');
            formattedData.director = previousMovieData.directors.split(',');
            formattedData.categories = previousMovieData.category.split(',');
            formattedData.warnings = previousMovieData.warning.split(',');
            
            const dateObj = new Date(previousMovieData.releaseDate);
            const formatDate = `${dateObj.getFullYear()}-${(dateObj.getMonth()+1).toString().padStart(2, "0")}-${dateObj.getDate().toString().padStart(2, "0")}`
            formattedData.releaseDate = formatDate;
            
            setmovieData(formattedData);
            
        }
        if (previousSessionsData) {

            setMovieSessions(previousSessionsData);
        }
    }, [previousMovieData, previousSessionsData])
    
    function addInputBtn(e) {
        const { name } = e.target;
        setmovieData((prevmovieData) => ({
            ...prevmovieData,
            [name]: [...prevmovieData[name], ''],
        }));
    }
    
    function removeInputBtn(e) {
        const { name } = e.target;
        const newArray = movieData[name];
        newArray.pop();
        setmovieData((prevmovieData) => ({
            ...prevmovieData,
            [name]: newArray,
        }));
    }
    
    function addSession() {
        const newSession = [...movieSessions];
        newSession.push({});

        setMovieSessions(newSession);
    }
    
    function handleChangeArray(e, i) {
        const { name, value } = e.target;
        setmovieData((prevmovieData) => {
            const updatedValue = [...prevmovieData[name]];
            updatedValue[i] = value;
            return { ...prevmovieData, [name]: updatedValue };
        });
    }
    const handleFileChange = (e) => {
        const { name } = e.target;
        const file = e.target.files[0];
        setmovieData((prevmovieData) => ({
            ...prevmovieData,
            [name]: file,
        }));
    };

    
    async function handleSubmit(e) {
        e.preventDefault();
        const errorsArray = validateForm(movieData, update);
        
        if (errorsArray.length > 0) {
            setErrorMsg(errorsArray);
            return;
        }
        
        if (update) {
            await deleteSessions(idMovie);
            updateMovie(movieData, idMovie);
            movieSessions.forEach((c) => {
                postSession(idMovie, c);
            });
        }
        else {
            const movieId = await createMovie(movieData);
            movieSessions.forEach((c) => {
                postSession(movieId, c);
            });
        }
        setAction(0);
    }

    return (
        <>
            <form className="backofficeForm" encType="multipart/form-data" onSubmit={handleSubmit}>
                {errorMsg.length > 0 && (
                    <div className="userMessageContainer">
                        <p>le ou les champs suivant ne sont pas valide(s) : </p>
                        <ul className="errorList">
                            {errorMsg.map((c, i) => {
                                return <li key={i}>{c}</li>;
                            })}
                        </ul>
                    </div>
                )}
                <fieldset id="mainFieldSet">
                    <div className="inputContainer">
                        <label htmlFor="movieTitle">Titre</label>
                        <input
                            id="movieTitle"
                            type="text"
                            name="movieTitle"
                            required
                            value={movieData.movieTitle}
                            onChange={(e) => handleChange(e, setmovieData, setErrorMsg)}
                        />
                    </div>
    
                    <div className="inputContainer">
                        <label htmlFor="posterFile">Télécharger une affiche</label>
                        <input
                            id="posterFile"
                            type="file"
                            name="posterFile"
                            onChange={handleFileChange}
                        />
                    </div>
                    
                    <div className="inputContainer">
                        <label htmlFor="posterAlt">
                            Texte alternatif de l'affiche
                        </label>
                        <input
                            id="posterAlt"
                            type="text"
                            name="posterAlt"
                            required
                            value={movieData.posterAlt}
                            onChange={(e) => handleChange(e, setmovieData, setErrorMsg)}
                        />
                    </div>
                    
                    <div className="inputContainer">
                        <label htmlFor="coverImg">Télécharger une image de couverture</label>
                        <input
                            id="coverImg"
                            type="file"
                            name="coverImgFile"
                            onChange={handleFileChange}
                        />
                    </div>
                    
                    <div className="inputContainer">
                        <label htmlFor="coverImgAlt">
                            Texte alternatif de l'image de couverture
                        </label>
                        <input
                            id="coverImgAlt"
                            type="text"
                            name="coverImgAlt"
                            required={true}
                            value={movieData.coverImgAlt}
                            onChange={(e) => handleChange(e, setmovieData, setErrorMsg)}
                        />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="releaseDate">Date de sortie</label>
                        <input
                            id="releaseDate"
                            type="date"
                            name="releaseDate"
                            value={movieData.releaseDate}
                            onChange={(e) => handleChange(e, setmovieData, setErrorMsg)}
                        />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="movieLength">
                            Durée du film en minutes
                        </label>
                        <input
                            id="movieLength"
                            type="number"
                            name="movieLength"
                            value={movieData.movieLength}
                            onChange={(e) => handleChange(e, setmovieData, setErrorMsg)}
                        />
                    </div>
                    <div className="inputContainer">
                        <DynamicInputList
                            arrayOfDatas={movieData.director}
                            inputLabel="Réalisateur"
                            inputName="director"
                            handleChangeArray={handleChangeArray}
                            addInputBtn={addInputBtn}
                            removeInputBtn= {removeInputBtn}
                        />
                    </div>
                    <div className="inputContainer">
                        <DynamicInputList
                            arrayOfDatas={movieData.mainActors}
                            inputLabel="Acteurs Principaux"
                            inputName="mainActors"
                            handleChangeArray={handleChangeArray}
                            addInputBtn={addInputBtn}
                            removeInputBtn= {removeInputBtn}
                        />
                    </div>
                    <div className="inputContainer">
                        <DynamicInputList
                            arrayOfDatas={movieData.categories}
                            inputLabel="Catégories"
                            inputName="categories"
                            handleChangeArray={handleChangeArray}
                            addInputBtn={addInputBtn}
                            removeInputBtn= {removeInputBtn}
                        />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="trailerUrl">
                            lien vers la bande-annonce
                        </label>
                        <input
                            id="trailerUrl"
                            type="text"
                            name="trailerUrl"
                            value={movieData.trailerUrl}
                            onChange={(e) => handleChange(e, setmovieData, setErrorMsg)}
                        />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="trailerFile">
                            Télécharger la bande-annonce
                        </label>
                        <input
                            id="trailerFile"
                            type="file"
                            name="trailerFile"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="synopsis">synopsis</label>
                        <textarea
                            id="synopsis"
                            className="backofficeTextArea"
                            name="synopsis"
                            style={{minHeight: '6em'}}
                            required
                            value={movieData.synopsis}
                            onChange={(e) => handleChange(e, setmovieData, setErrorMsg)}
                        />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="pg">public authorisé</label>
                        <input
                            id="pg"
                            type="text"
                            name="pg"
                            value={movieData.pg}
                            onChange={(e) => handleChange(e, setmovieData, setErrorMsg)}
                        />
                    </div>
                    <div className="inputContainer">
                        <DynamicInputList
                            arrayOfDatas={movieData.warnings}
                            inputLabel="Avertissements"
                            inputName="warnings"
                            handleChangeArray={handleChangeArray}
                            addInputBtn={addInputBtn}
                            removeInputBtn= {removeInputBtn}
                        />
                    </div>
                    <div className="inputContainer">
                        <label>Mettre le site en ligne ?</label>
                        <div className="radioInputContainer">
                            <label htmlFor="isOnline">
                                <input
                                    id="isOnline"
                                    type="radio"
                                    id="isOnline"
                                    name="isOnline"
                                    value={'1'}
                                    checked={movieData.isOnline == '1'}
                                    onChange={(e) => handleChange(e, setmovieData, setErrorMsg)}
                                />
                                Oui
                            </label>
                            <label htmlFor="isNotOnline">
                                <input
                                    type="radio"
                                    id="isNotOnline"
                                    name="isOnline"
                                    value={'0'}
                                    checked={movieData.isOnline == '0'}
                                    onChange={(e) => handleChange(e, setmovieData, setErrorMsg)}
                                />
                                Non
                            </label>
                        </div>
                    </div>
                </fieldset>
                <button className="backofficeBtn backofficeFormBtn" type="Button" onClick={addSession}>Ajouter une séance</button>
                {movieSessions.map((c, i) => <CreateSession key={i} update={update} movieSessions={movieSessions} setErrorMsg={setErrorMsg} setMovieSessions={setMovieSessions} index={i} />)}
                <input className="backofficeBtn backofficeFormBtn" type="submit" value="valider" />
            </form>
        </>
    );
}
export default MovieManagerForm;
