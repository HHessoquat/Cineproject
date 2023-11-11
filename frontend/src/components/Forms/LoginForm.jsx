import { useState, useContext } from 'react';
import handleChange from '../../utils/formsManagement/handleChange.js';
import {AuthentificationContext} from '../../utils/context';
import { login } from '../../features/user/api.js';
import { validateLogin } from '../../features/user/validateUserForm.js';
function LoginForm({closeModal}) {
    
    const [identifier, setIdentifier] = useState({
        pseudo: "",
        password: "",
    });
    const [errorMsg, setErrorMsg] = useState([]);
    
    const {setIsLogged, setConnectedUser, setRole} = useContext(AuthentificationContext); 
    
    
    
    async function handleSubmit(e) {
        e.preventDefault();
        
        const errors = validateLogin(identifier);
        
        if (errors.length > 0) {
            setErrorMsg(errors);
            return;
        }
        
        const loginResult = await login(identifier);
        
        if (loginResult.isLogged === true) {
            setErrorMsg([]);
            setIsLogged(true);
            setConnectedUser(loginResult.content.id);
            setRole(loginResult.content.role);
            
            sessionStorage.setItem('isLogged', JSON.stringify(true));
            sessionStorage.setItem('userId', loginResult.content.id);
            sessionStorage.setItem('userRole', loginResult.content.role);
            

            closeModal();
        }else if (loginResult.isLogged === null) {
            setErrorMsg(['Identifiants invalides']);
        } else {
            setErrorMsg([`Une erreur s'est produite lors de la connxion, veuillez réessayer plus tard.`]);
        }
    }

    return (
        <form className="loginForm" onSubmit={handleSubmit}>
        {errorMsg && (
        <ul>
            {errorMsg.map((c,i) => {
                return (
                  <li key={-i}>
                    {c}
                  </li>
                )}
            )}
         </ul>
        )}
            <div className="inputContainer" >
                <p class="loginHeader">
                    J'ai déjà un compte
                </p>
                <label>
                pseudo : 
                    <input
                        type="text"
                        name="pseudo"
                        value={identifier.pseudo}
                        onChange={(e) => handleChange(e, setIdentifier, setErrorMsg)}
                    />
                </label>
            </div>
                <div className="inputContainer">
                <label>
                mot de passe : 
                    <input
                        type="password"
                        name="password"
                        value={identifier.password}
                        onChange={(e) => handleChange(e, setIdentifier, setErrorMsg)}
                    />
                </label>
            </div>
            <input type="submit" value="Se connecter" />
        </form>
        )
}
export default LoginForm