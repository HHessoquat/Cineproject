import { useState, useEffect } from 'react';
import {useParams } from 'react-router-dom';
import handleChange from '../../utils/formsManagement/handleChange.js';
import { fetchAllRooms } from '../../features/room/api.js';
import { deleteOneSession } from '../../features/movieSession/api.js';

function AddSessionForm({update, movieSessions, setErrorMsg, setMovieSessions, index}) {
    const { idMovie } = useParams();
    const [session, setSession] = useState({
        idMovie,
        date: '',
        time: '',
        idRoom: '1',
        event: '',
    });

    const [rooms, setRooms] = useState([]);
    
    useEffect(() => {
        if (Object.keys(movieSessions[index]).length > 0) {
            setSession(movieSessions[index]);
        }
    }, []);
    useEffect(() => {
        async function getRooms() {
            try {
                const retrievedRooms = await fetchAllRooms();
                setRooms(retrievedRooms);
            } catch (err) {
                console.log(err);
            }
        }
        getRooms();
    }, [])
    
    function updateSession(e) {
        handleChange(e, setSession, setErrorMsg);
        
        //bypass the useState delayed mutate
        const newSessionData = {...session, [e.target.name] : e.target.value};
        const updatedMovieSessions = [...movieSessions];
        
        
        updatedMovieSessions.splice(index, 1, newSessionData);
        setMovieSessions(updatedMovieSessions);
    }
    
    async function removeSession() {
        const updatedSessions = [...movieSessions];
        updatedSessions.splice(index, 1);
        if (update) {
            await deleteOneSession(session.id);
        }
    }

    return (
            <fieldset className="sessionFieldSet">
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
                événement :
                    <select 
                        name="event" id="eventInput" 
                        onChange={updateSession}
                        value={session.event}
                    >
                    <option value=''>---</option>
                    <option value='premiere'>Avant-première</option>
                    <option value='wednesday'>Le Mercredi des enfants</option>
                    <option value='friday'>Les Vendredis cultes</option>

                    </select>
                </label>
            </div>
            <div className='inputContainer'>
                <label>
                salle :
                    <select 
                        name="idRoom" id="idRoom" 
                        onChange={updateSession}
                        value={session.idRoom}
                    >
                    {rooms.map((c, i) => {
                        return (<option key={i + Number(c.name)} value={c.name}>{c.name}</option>)
                        
                    })}
                
                    </select>
                </label>
            </div>
            <button className="backofficeBtn backofficeFormBtn" type="button" onClick={removeSession}>supprimer</button>
        </fieldset>
    
        )
}

export default AddSessionForm;