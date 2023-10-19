export async function fetchMovieData(idMovie) {
                try {
                 
                    const response = await fetch(`http://jeremydequeant.ide.3wa.io:9000/api/movie/${idMovie}`, {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            accept: 'application/json'
                        }
                    })
                    
                    if (!response.ok) {
                        console.log(response);
                        throw new Error('erreur lors de la récupération du film');
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

export async function fetchOnlineMoviesdata(setMovies) {
    try {
        const result = await fetch('http://jeremydequeant.ide.3wa.io:9000/api/movie/online',{
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept' : 'application/json',
            }
        });
        const data = await result.json();
        console.log(data.message);
        setMovies(data.content);
    }catch (err) {
        console.log(err)
    }
}

export function updateMovie(formData, idMovie) {
        const dataToSend = new FormData();
        for (const key in formData) {
            if (key !== 'releaseDate' && key !=='movieLength') {
            dataToSend.append(key, formData[key]);
            }
        }
        
        dataToSend.append('movieLength', Number(formData.movieLength));
        dataToSend.append('releaseDate', new Date(formData.releaseDate).toISOString().slice(0, 19).replace('T', ' '));
        
        fetch(`http://jeremydequeant.ide.3wa.io:9000/api/movie/${idMovie}`,{
            method: 'PUT',
            credentials: 'include',
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
    
    
export async  function createMovie(formData) {
    try {
        const dataToSend = new FormData();
        
        for (const key in formData) {
            if (key !=='movieLength') {
            dataToSend.append(key, formData[key]);
            }
        }
        
        dataToSend.append('movieLength', Number(formData.movieLength));
        
        
        const fetchResult = await fetch('http://jeremydequeant.ide.3wa.io:9000/api/movie', {
            method: 'POST',
            credentials: 'include',
            body: dataToSend,
        })
        
        const response = await fetchResult.json();
        console.log("reponse de l'API : " + response.message);

        return response.movieId;
    }catch (err) {
        console.log(`erreur lors de l'envoi du formulaire : `, err)
    }
        
    }
    
export function deleteMovie(idMovie) {
        fetch(`http://jeremydequeant.ide.3wa.io:9000/api/movie/${idMovie}`,{
            method: 'DELETE',
            credentials: 'include',
            headers: {
                accept: 'application/json',
            }
            
        }).then((response) => {
            response.json()
        }).then((data) => console.log(data.message));
    }