import { useState, useEffect } from 'react';
import {useParams } from 'react-router-dom';
import handleChange from '../../utils/formsManagement/handleChange.js'

function AddSessionForm({movieSessions, setErrorMsg, setMovieSessions, index}) {
    const { idMovie } = useParams();
    const [session, setSession] = useState({
        idMovie,
        date: '',
        time: '',
        room: '1',
    });
    function updateSession(e) {
        console.log(setSession)
        handleChange(e, setSession, setErrorMsg);
        const updatedMovieSessions = [...movieSessions];

        // Insérez la nouvelle session à l'index spécifié
        updatedMovieSessions.splice(index, 1, session);

        // Mettez à jour le tableau movieSessions avec la nouvelle session insérée à l'index
        setMovieSessions(updatedMovieSessions);
    }
    return (
            <fieldset>
            <div className='inputContainer'>
                <label>
                Date : 
                    <input  
                        type="date"
                        name="date"
                        value={session.date}
                        onChange={updateSession}
                    />
                </label>
            </div>
            <div className='inputContainer'>
                <label>
                Heure :
                    <input  
                        type="time"
                        name="time"
                        value={session.time}
                        onChange={updateSession}
                        />
                </label>
            </div>
            <div className='inputContainer'>
                <label>
                salle :
                    <select 
                        name="room" id="room" 
                        onChange={updateSession}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </label>
            </div>
        </fieldset>
    
        )
}

export default AddSessionForm;