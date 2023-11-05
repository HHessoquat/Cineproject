import {useState, useEffect } from 'react';
import handleChange from '../../utils/formsManagement/handleChange.js';
import { postUser, updateUser } from '../../features/user/api.js';
import { validateSignIn } from '../../features/user/validateUserForm.js';

function UserManagementForm ({update, id, currentUser, isInFrontOffice, closeModal}) {
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
        
        const errors = validateSignIn(user);
        
        if (errors.length > 0) {
            setErrorMsg(errors);
            return;
        }
        
        if (update) {
            updateUser(id, user);
            closeModal();
            return
        }
        postUser(user);
        closeModal();
    }
    
    return(
        <form 
            className={isInFrontOffice ? "" : "backofficeForm"}
            onSubmit={handleSubmit}

        >
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
                    Prénom : 
                    <input type="text" id="firstName" name="firstName" value={user.firstName} onChange={(e) => handleChange(e, setUser, setErrorMsg)} />
                </label>
            </div>
            <div className="inputContainer">
                <label>
                    Nom : 
                    <input type="text" id="name" name="name" value={user.name} onChange={(e) => handleChange(e, setUser, setErrorMsg)} />
                </label>
            </div>
            
            <div className="inputContainer">
                <label>
                    Email : 
                    <input type="email" id="email" name="email" value={user.email} onChange={(e) => handleChange(e, setUser, setErrorMsg)} />
                </label>
            </div>
            <div className="inputContainer">
                <label>
                    Pseudo : 
                    <input type="text" id="pseudo" name="pseudo" value={user.pseudo} onChange={(e) => handleChange(e, setUser, setErrorMsg)} />
                </label>
            </div>
            {!update && 
                <div className="inputContainer">
                    <label>
                        Mot de passe : 
                        <input type="password" id="password" name="password" value={user.password} onChange={(e) => handleChange(e, setUser, setErrorMsg)} />
                    </label>
                </div>
            }
            {!isInFrontOffice && (
                <div className="inputContainer">
                    <select name="role" value={user.role} onChange={(e) => handleChange(e, setUser, setErrorMsg)}>
                          <option value="admin">Admin</option>
                          <option value="moderator">Modérateur</option>
                          <option value="user">Utilisateur</option>
                </select>
                </div>
            )}
        <input type="submit" value="Envoyer" />
        </form>
        )
}
export default UserManagementForm