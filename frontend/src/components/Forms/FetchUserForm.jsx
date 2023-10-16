import { useState } from 'react';
import handleChange from '../../utils/formsManagement/handleChange.js';

function FetchUser() {
    const [userSeeked, setUserSeeked] = useState({
        name: '',
        firstName: "",
    });
    const [errorMsg, setErrorMsg] = useState([]);
    function getAll() {
        
    }
    return (
        <>
            <form>
                <div className="inputContainer">
                    <label>
                        Nom :
                        <input type="text" id="name" name="name" value={userSeeked.named} onChange={(e) => handleChange(e, setUserSeeked, setErrorMsg)} />
                    </label>
                </div>
                <div className="inputContainer">
                    <label>
                    prénom :
                    <input type="text" id="name" name="name" value={userSeeked.firstName} onChange={(e) => handleChange(e, setUserSeeked, setErrorMsg)} />
                    </label>
                </div>
                <input type="submit" value="chercher" />
            </form>
            <button type="button" onClick={getAll}> afficher tout les utilisateurs </button>
        </>
        )
}

export default FetchUser