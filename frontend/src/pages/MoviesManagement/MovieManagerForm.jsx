import { useState } from 'react';
import DynamicInputList from '../../components/Forms/DynamicInputList';

function validateForm(formData) {
    let updateErrorMsg = [];
    if (!formData.movieTitle) {
        updateErrorMsg.push(`Le titre du film est obligatoire`);
    }
    if (!formData.posterFile) {
        updateErrorMsg.push(`Vous devez ajouter une affiche pour le film`);
    }
    if (!formData.posterAlt) {
        updateErrorMsg.push(
            `l'affiche du film doit avoir un texte alternatif qui s'affichera en cas de problème avec le chargement de l'image`
        );
    }
    if (!formData.trailerFile && !formData.trailerUrl) {
        updateErrorMsg.push(`Le film doit avoir une bande-annonce`);
    }
    if (formData.categories.length === 0) {
        updateErrorMsg.push(`Le film doit avoir au moins une catégorie`);
    }

    if (isNaN(Number(formData.movieLength))) {
        updateErrorMsg.push('La durée du film doit être un nombre');
    }

    return updateErrorMsg;
}

function MovieManagerForm() {
    const [formData, setFormData] = useState({
        movieTitle: '',
        posterUrl: '',
        posterAlt: '',
        coverImgUrl: '',
        coverImgAlt: '',
        releaseDate: '',
        movieLength: null,
        synospis: '',
        director: '',
        mainActors: [''],
        categories: [''],
        trailerUrl: '',
        pg: '',
        warnings: [''],
    });
    const [errorMsg, setErrorMsg] = useState([]);

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

    function handleSubmit(e) {
        e.preventDefault();
        const errorsArray = validateForm(formData);
        setErrorMsg(errorsArray);
        if (errorsArray.length > 0) {
            return;
        }

        const dataToSend = new FormData();
        
        for (const key in formData) {
            if (key !== 'releaseDate' && key !=='movieLength') {
            dataToSend.append(key, formData[key]);
            }
        }
        
        dataToSend.append('movieLength', Number(formData.movieLength));
        dataToSend.append('releaseDate', new Date(formData.releaseDate).toISOString().slice(0, 19).replace('T', ' '));

        fetch('http://jeremydequeant.ide.3wa.io:9000/api/movie', {
            method: 'POST',
            body: dataToSend,
        })
            .then((response) => response.json())
            .then((data) =>
                console.log("reponse de l'API : " + JSON.stringify(data))
            )
            .catch((error) =>
                console.error(`erreur lors de l'envoi du formulaire : `, error)
            );
    }
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
                        value={formData.length}
                        onChange={handleChange}
                    />
                </div>
                <div className="inputContainer">
                    <label htmlFor="director">Réalisateur</label>
                    <input
                        type="text"
                        name="director"
                        value={formData.director}
                        onChange={handleChange}
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
