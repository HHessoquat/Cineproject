 import validateForm from './validateMovieForm.js';
 function createMovie(e, formData, setErrorMsg) {
        e.preventDefault();
        const errorsArray = validateForm(formData);
        setErrorMsg(errorsArray);
        if (errorsArray.length > 0) {
            return;
        }

        const dataToSend = new FormData();
        
        for (const key in formData) {
            if (key !=='movieLength') {
            dataToSend.append(key, formData[key]);
            }
        }
        
        dataToSend.append('movieLength', Number(formData.movieLength));
        console.log("passe");
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
export default createMovie