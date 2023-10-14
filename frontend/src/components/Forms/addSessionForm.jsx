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
        handleChange(e, setSession, setErrorMsg);
        
        //bypass the useState delayed mutate
        const newSessionData = {...session, [e.target.name] : e.target.value};
        const updatedMovieSessions = [...movieSessions];
        
        
        updatedMovieSessions.splice(index, 1, newSessionData);
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