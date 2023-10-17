import {useState, useEffect } from 'react';
import handleChange from '../../utils/formsManagement/handleChange.js';
import { postUser, updateUser } from '../../features/user/api.js';

function UserManagementForm ({update, id, currentUser}) {
    const [user, setUser] = useState({
        name: "",
        firstName: "",
        pseudo: "",
        email: '',
        password: "",
        role: "user"
    });
    const [errorMsg, setErrorMsg] = useState([]);
    
    useEffect(() => {
        if (update) {
            setUser(currentUser);
        }
    },[])
    
    function handleSubmit(e) {
        e.preventDefault();
        if (update) {
            updateUser(id, user);
            return
        }
        
        postUser(user);
    }
    
    return(
        <form className="backOfficeForm" onSubmit={handleSubmit}>
        {errorMsg.length > 0 && (
                    <div className="userMessageContainer">
                        <p>le ou les champs suivant ne sont pas valide(s) : </p>
                        <ul className="errorList">
                            {errorMsg.map((c, i) => {
                                return <li key={(i * 965) / 36 + 5.25}>{c}</li>;
                            })}
                        </ul>
                    </div>
                )}
            <div className="inputContainer">
                <label>
                    Nom : 
                    <input type="text" id="name" name="name" value={user.name} onChange={(e) => handleChange(e, setUser, setErrorMsg)} />
                </label>
            </div>
                <label>
                    prénom : 
                    <input type="text" id="firstName" name="firstName" value={user.firstName} onChange={(e) => handleChange(e, setUser, setErrorMsg)} />
                </label>
            <div className="inputContainer">
                <label>
                        email : 
                        <input type="email" id="email" name="email" value={user.email} onChange={(e) => handleChange(e, setUser, setErrorMsg)} />
                </label>
            </div>
                <label>
                    pseudo : 
                    <input type="text" id="pseudo" name="pseudo" value={user.pseudo} onChange={(e) => handleChange(e, setUser, setErrorMsg)} />
                </label>
            {!update && 
                <div className="inputContainer">
                    <label>
                        mot de passe : 
                        <input type="password" id="password" name="password" value={user.password} onChange={(e) => handleChange(e, setUser, setErrorMsg)} />
                    </label>
                </div>
            }
            
            <select name="role" value={user.role} onChange={(e) => handleChange(e, setUser, setErrorMsg)}>
                  <option value="admin">Admin</option>
                  <option value="moderator">Modérateur</option>
                  <option value="user">Utilisateur</option>
            </select>
            
        <input type="submit" value="Envoyer" />
        </form>
        )
}
export default UserManagementForm