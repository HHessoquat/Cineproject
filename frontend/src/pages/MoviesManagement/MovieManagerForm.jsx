import { useState, useEffect } from 'react';
import DynamicInputList from '../../components/Forms/DynamicInputList';
import validateForm from '../../features/moviesManagement/validateMovieForm.js';
import { createMovie, updateMovie } from '../../features/moviesManagement/api.js';
import handleChange from '../../utils/formsManagement/handleChange.js';
import CreateSession from '../../components/Forms/addSessionForm.jsx';

function MovieManagerForm({update, previousMovieData, idMovie}) {
    const [formData, setFormData] = useState({
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
        isOnline: 0,
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
                trailerUrl: previousMovieData.trailer,
            };
            formattedData.mainActors = previousMovieData.actors.split(',');
            formattedData.director = previousMovieData.directors.split(',');
            formattedData.categories = previousMovieData.category.split(',');
            formattedData.warnings = previousMovieData.warning.split(',');
            
            const dateObj = new Date(previousMovieData.releaseDate);
            const formatDate = `${dateObj.getFullYear()}-${(dateObj.getMonth()+1).toString().padStart(2, "0")}-${dateObj.getDate().toString().padStart(2, "0")}`
            formattedData.releaseDate = formatDate;
            
            setFormData(formattedData);
        }
    }, [previousMovieData])
    
    function addInputBtn(e) {
        const { name } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: [...prevFormData[name], ''],
        }));
    }
    
    function addSession() {
        const newSession = [...movieSessions];
        newSession.push({});
        console.log(newSession);
        setMovieSessions(newSession);
    }
    
    function handleChangeArray(e, i) {
        const { name, value } = e.target;
        setFormData((prevFormData) => {
            const updatedValue = [...prevFormData[name]];
            updatedValue[i] = value;
            return { ...prevFormData, [name]: updatedValue };
        });
    }
    const handleFileChange = (e) => {
        const { name } = e.target;
        const file = e.target.files[0];
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: file,
        }));
    };

    
    function handleSubmit(e) {
        e.preventDefault();
        const errorsArray = validateForm(formData, update);
        
        if (errorsArray.length > 0) {
            setErrorMsg(errorsArray);
            return;
        }
        
        if (update) {
            updateMovie(e, formData, idMovie)
        }
        else {
            createMovie(e, formData);
        }
    }
    console.log(movieSessions);
    return (
        <>
            <form className="backOfficeForm" encType="multipart/form-data" onSubmit={handleSubmit}>
                {errorMsg.length > 0 && (
                    <div className="userMessageContainer">
                        <p>le ou les champs suivant ne sont pas valide(s) : </p>
                        <ul className="errorList">
                            {errorMsg.map((c, i) => {
                                return <li key={(i * 965) / 36 + 5.25}>{c}</li>;
                            })}
                        </ul>
                    </div>
                )}
                <fieldset>
                    <div className="inputContainer">
                        <label htmlFor="movieTitle">Titre</label>
                        <input
                            type="text"
                            name="movieTitle"
                            required
                            value={formData.movieTitle}
                            onChange={(e) => handleChange(e, setFormData, setErrorMsg)}
                        />
                    </div>
    
                    <div className="inputContainer">
                        <label htmlFor="posterFile">Télécharger une affiche</label>
                        <input
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
                            type="text"
                            name="posterAlt"
                            required
                            value={formData.posterAlt}
                            onChange={(e) => handleChange(e, setFormData, setErrorMsg)}
                        />
                    </div>
                    
                    <div className="inputContainer">
                        <label htmlFor="coverImg">Télécharger une image de couverture</label>
                        <input
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
                            type="text"
                            name="coverImgAlt"
                            required={true}
                            value={formData.coverImgAlt}
                            onChange={(e) => handleChange(e, setFormData, setErrorMsg)}
                        />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="releaseDate">Date de sortie</label>
                        <input
                            type="date"
                            name="releaseDate"
                            value={formData.releaseDate}
                            onChange={(e) => handleChange(e, setFormData, setErrorMsg)}
                        />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="movieLength">
                            Durée du film en minutes
                        </label>
                        <input
                            type="number"
                            name="movieLength"
                            value={formData.movieLength}
                            onChange={(e) => handleChange(e, setFormData, setErrorMsg)}
                        />
                    </div>
                    <div className="inputContainer">
                        <DynamicInputList
                            arrayOfDatas={formData.director}
                            inputLabel="Réalisateur"
                            inputName="director"
                            handleChangeArray={handleChangeArray}
                            addInputBtn={addInputBtn}
                        />
                    </div>
                    <div className="inputContainer">
                        <DynamicInputList
                            arrayOfDatas={formData.mainActors}
                            inputLabel="Acteurs Principaux"
                            inputName="mainActors"
                            handleChangeArray={handleChangeArray}
                            addInputBtn={addInputBtn}
                        />
                    </div>
                    <div className="inputContainer">
                        <DynamicInputList
                            arrayOfDatas={formData.categories}
                            inputLabel="Catégories"
                            inputName="categories"
                            handleChangeArray={handleChangeArray}
                            addInputBtn={addInputBtn}
                        />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="trailerUrl">
                            lien vers la bande-annonce
                        </label>
                        <input
                            type="text"
                            name="trailerUrl"
                            value={formData.trailerUrl}
                            onChange={(e) => handleChange(e, setFormData, setErrorMsg)}
                        />
                    </div>
                    <div className="inputContainer">
                        <label htmlFor="trailerFile">
                            Télécharger la bande-annonce
                        </label>
                        <input
                            type="file"
                            name="trailerFile"
                            onChange={handleFileChange}
                        />
                    </div>
                    <label htmlFor="synopsis">synopsis</label>
                    <textarea
                        name="synopsis"
                        required
                        value={formData.synopsis}
                        onChange={(e) => handleChange(e, setFormData, setErrorMsg)}
                    />
                    <div className="inputContainer">
                        <label htmlFor="pg">public authorisé</label>
                        <input
                            type="text"
                            name="pg"
                            value={formData.pg}
                            onChange={(e) => handleChange(e, setFormData, setErrorMsg)}
                        />
                    </div>
                    <div className="inputContainer">
                        <DynamicInputList
                            arrayOfDatas={formData.warnings}
                            inputLabel="Avertissements"
                            inputName="warnings"
                            handleChangeArray={handleChangeArray}
                            addInputBtn={addInputBtn}
                        />
                    </div>
                    <p className="inputContainer">
                        Mettre le site en ligne ?
                       
                        <input
                            type="radio"
                            id="isOnline"
                            name="isOnline"
                            value={1}
                            checked={formData.isOnline === 1}
                            onChange={(e) => handleChange(e, setFormData, setErrorMsg)}
                        />
                         <label htmlFor="isOnline">oui</label>
                          <input
                            type="radio"
                            id="isNotOnline"
                            name="isOnline"
                            value={0}
                            checked={formData.isOnline === 0}
                            onChange={(e) => handleChange(e, setFormData, setErrorMsg)}
                        />
                         <label htmlFor="isNotOnline">Non</label>
                    </p>
                </fieldset>
                <button type="Button" onClick={addSession}>Ajouter une séance</button>
                {movieSessions.map((c, i) => <CreateSession key={i+99*222} movieSessions={movieSessions} setErrorMsg={setErrorMsg} setMovieSessions={setMovieSessions} index={i} />)}
                <input type="submit" value="valider" />
            </form>
        </>
    );
}
export default MovieManagerForm;
