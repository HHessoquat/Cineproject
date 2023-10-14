export async function fetchMovieDatas(idMovie, setMovie) {
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
                
export async function fetchMoviesData(setMovies) {
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

export function updateMovie(e, formData, idMovie) {
        e.preventDefault();
        const dataToSend = new FormData();
        for (const key in formData) {
            if (key !== 'releaseDate' && key !=='movieLength') {
            dataToSend.append(key, formData[key]);
            }
        }
        
        dataToSend.append('movieLength', Number(formData.movieLength));
        dataToSend.append('releaseDate', new Date(formData.releaseDate).toISOString().slice(0, 19).replace('T', ' '));
        
        fetch(`http://jeremydequeant.ide.3wa.io:9000/api/movie/update/${idMovie}`,{
            method: 'PUT',
            headers: {
                accept: 'application/json'
            },
            body: dataToSend
        })
            .then((response) => response.json())
            .then((data) =>
                console.log("reponse de l'API : " + JSON.stringify(data))
            )
            .catch((error) =>
                console.error(`erreur lors de l'envoi du formulaire : `, error)
            );
    }
    
export  function createMovie(e, formData) {
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
    
export function deleteMovie(idMovie) {
        fetch(`http://jeremydequeant.ide.3wa.io:9000/api/movie/${idMovie}`,{
            method: 'DELETE',
            headers: {
                accept: 'application/json',
            }
            
        }).then((response) => {
            response.json()
        }).then((data) => console.log(data.message));
    }