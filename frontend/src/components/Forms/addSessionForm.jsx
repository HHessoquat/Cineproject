import { useState, useEffect } from 'react';
import {useParams } from 'react-router-dom';
import handleChange from '../../utils/formsManagement/handleChange.js'

function AddSessionForm() {
    const { idMovie } = useParams();
    const [sessionData, setSessionData] = useState({
        idMovie,
        date: '',
        time: '',
        room: '1',
    });
    return (
        <form>
            <div className='inputContainer'>
                <label>
                Date : 
                    <input  
                        type="date"
                        name="date"
                        value={sessionData.date}
                        onChange={handleChange}/>
                </label>
            </div>
            <div className='inputContainer'>
                <label>
                Heure :
                    <input  
                        type="time"
                        name="time"
                        value={sessionData.time}
                        onChange={handleChange}/>
                </label>
            </div>
            <div className='inputContainer'>
                <label>
                salle :
                    <select name="room" id="room" onChange={handleChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </label>
            </div>
        </form>
        )
}

export default AddSessionForm;