import { useState, useEffect } from 'react';
import DynamicInputList from '../../components/Forms/DynamicInputList';
import validateForm from '../../utils/moviesManagement/validateMovieForm.js';
import createMovie from '../../utils/moviesManagement/createMovie.js';

function MovieManagerForm({update, previousMovieData, idMovie}) {
    const [formData, setFormData] = useState({
        movieTitle: '',
        posterAlt: '',
        coverImgAlt: '',
        releaseDate: '',
        movieLength: null,
        synospis: '',
        director: [''],
        mainActors: [''],
        categories: [''],
        trailerUrl: '',
        pg: '',
        warnings: [''],
    });
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
            };
            formattedData.mainActors = previousMovieData.actors.split(',');
            formattedData.director = previousMovieData.directors.split(',');
            formattedData.categories = previousMovieData.category.split(',');
            formattedData.warnings = previousMovieData.warning.split(',');
            
            const dateObj = new Date(previousMovieData.releaseDate);
            const formatDate = `${dateObj.getFullYear()}-${(dateObj.getMonth()+1).toString().padStart(2, "0")}-${dateObj.getDate().toString().padStart(2, "0")}`
            formattedData.releaseDate = formatDate;
            
           console.log(formattedData);
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

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        setErrorMsg([]);
    }
    
    function updateMovie(e) {
        e.preventDefault();
        const dataToSend = new FormData();
        for (const key in formData) {
            if (key !== 'releaseDate' && key !=='movieLength') {
            dataToSend.append(key, formData[key]);
            }
        }
        
        dataToSend.append('movieLength', Number(formData.movieLength));
        dataToSend.append('releaseDate', new Date(formData.releaseDate).toISOString().slice(0, 19).replace('T', ' '));
        dataToSend.append('posterUrl', previousMovieData.poster);
        
        fetch(`http://jeremydequeant.ide.3wa.io:9000/api/movie/update/${idMovie}`,{
            method: 'PUT',
            headers: {
                accept: 'application/json'
            },
            body: dataToSend
        })
    }
    function handleSubmit(e) {
        if (update) {
            updateMovie(e)
        }
        else {
            createMovie(e, formData, setErrorMsg);
        }
    }

    
    console.log(formData);
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
                <div className="inputContainer">
                    <label htmlFor="movieTitle">Titre</label>
                    <input
                        type="text"
                        name="movieTitle"
                        required
                        value={formData.movieTitle}
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        required
                        value={formData.coverImgAlt}
                        onChange={handleChange}
                    />
                </div>
                <div className="inputContainer">
                    <label htmlFor="releaseDate">Date de sortie</label>
                    <input
                        type="date"
                        name="releaseDate"
                        value={formData.releaseDate}
                        onChange={handleChange}
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
                        onChange={handleChange}
                    />
                </div>
                <div className="inputContainer">
                    <DynamicInputList
                        arrayOfDatas={formData.director}
                        inputLabel="Réalisateur"
                        inputName="director"
                        handleChangeArray={handleChangeArray}
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                    onChange={handleChange}
                />
                <div className="inputContainer">
                    <label htmlFor="pg">public authorisé</label>
                    <input
                        type="text"
                        name="pg"
                        value={formData.pg}
                        onChange={handleChange}
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
                <input type="submit" value="valider" />
            </form>
        </>
    );
}
export default MovieManagerForm;
