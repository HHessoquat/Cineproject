export async function fetchMovieData(idMovie, setErrorMsg) {
                try {
                 
                    const response = await fetch(`http://jeremydequeant.ide.3wa.io:9000/api/movie/${idMovie}`, {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            accept: 'application/json'
                        }
                    })

                    if (!response.ok) {

                        return {ok: false, message: response.message}
                    }
                    
                    const movieDatas = await response.json();
  
                    return movieDatas
                    
                } catch (error) {
                    console.log(error);
                    }
                }
                
export async function fetchMoviesData() {
      try {
        const response = await fetch('http://jeremydequeant.ide.3wa.io:9000/api/movie', {
          method: 'GET',
          credentials: 'include',
          headers: {
            accept: 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Erreur réseau');
        }

        const data = await response.json();
        return data.content;
      } catch (error) {
        console.error('Erreur:', error);
      }
    }
    
export async function getMovieByTitle(title) {
    try {
        const response = await fetch(`http://jeremydequeant.ide.3wa.io:9000/api/movie/byTitle/${title}`,{
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json', 
                'Content-type': 'application/json',
            },
        });
        
        const data = await response.json();
        console.log(data.message);
        return data.content;
        
    }catch (err) {
        console.log(err);
    }
}

export async function fetchOnlineMoviesdata() {
    try {
        const result = await fetch('http://jeremydequeant.ide.3wa.io:9000/api/movie/online',{
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept' : 'application/json',
            }
        });
        const data = await result.json();

        return data.content;
    }catch (err) {
        console.log(err)
    }
}

export async function fetchEventMovie(event) {
    try {
        const result = await fetch(`http://jeremydequeant.ide.3wa.io:9000/api/movie/event/${event}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
            }
        });
        const data = await result.json();
        console.log(data.message);
        return data.content;
    } catch (err) {
        console.log(err)
    }
}

export async function updateMovie(formData, idMovie, setErrorMsg) {
    try {
        const dataToSend = new FormData();
        for (const key in formData) {
            if (key !== 'releaseDate' && key !=='movieLength') {
            dataToSend.append(key, formData[key]);
            }
        }
        
        dataToSend.append('movieLength', Number(formData.movieLength));
        dataToSend.append('releaseDate', new Date(formData.releaseDate).toISOString().slice(0, 19).replace('T', ' '));
        
        const response = await fetch(`http://jeremydequeant.ide.3wa.io:9000/api/movie/${idMovie}`,{
            method: 'PUT',
            credentials: 'include',
            headers: {
                accept: 'application/json'
            },
            body: dataToSend
        })
        
        const data = await response.json();
        console.log(data.message);
        if (!response.ok) {
            setErrorMsg([data.message])
            return;
        }
        return data.movieId;
    }catch (err) {
        console.log(`erreur lors de l'envoi du formulaire : `, err)
    }
}
    
    
export async  function createMovie(formData, setErrorMsg) {
    try {
        const dataToSend = new FormData();
        
        for (const key in formData) {
            if (key !=='movieLength') {
            dataToSend.append(key, formData[key]);
            }
        }
        
        dataToSend.append('movieLength', Number(formData.movieLength));
        
        
        const response = await fetch('http://jeremydequeant.ide.3wa.io:9000/api/movie', {
            method: 'POST',
            credentials: 'include',
            body: dataToSend,
        })

        const data = await response.json();
        console.log(data.message);
        if (!response.ok) {
            setErrorMsg([data.message])
            return;
        }
        return data.movieId;
    }catch (err) {
        console.log(`erreur lors de l'envoi du formulaire : `, err)
    }
        
}
    
export async function deleteMovie(idMovie) {
    try {
         const response = await fetch(`http://jeremydequeant.ide.3wa.io:9000/api/movie/${idMovie}`,{
            method: 'DELETE',
            credentials: 'include',
            headers: {
                accept: 'application/json',
            }
        });
        const data = await response.json();

        console.log(data.message);
        if (data.content) {
            return data.content;
        }
        
    }catch (err) {
        console.log(err);
    }
}