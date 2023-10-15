import { useState, useEffect } from 'react';
import {useParams } from 'react-router-dom';
import handleChange from '../../utils/formsManagement/handleChange.js'

function AddSessionForm({movieSessions, setErrorMsg, setMovieSessions, index}) {
    const { idMovie } = useParams();
    const [session, setSession] = useState({
        idMovie,
        date: '',
        time: '',
        idRoom: '1',
    });
    
    useEffect(() => {
        if (movieSessions[index]) {
            setSession(movieSessions[index]);
        }
    }, [])
    
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
                        name="idRoom" id="idRoom" 
                        onChange={updateSession}
                    >
                        <option value="1" selected={session.idRoom === "1"} >1</option>
                        <option value="2" selected={session.idRoom === "2"} >2</option>
                        <option value="3" selected={session.idRoom === "3"} >3</option>
                    </select>
                </label>
            </div>
        </fieldset>
    
        )
}

export default AddSessionForm;