import { useState } from 'react';
import handleChange from '../../utils/formsManagement/handleChange.js'
import { login } from '../../features/user/api.js';
function LoginForm({closeModal}) {
    
    const [identifier, setIdentifier] = useState({
        pseudo: "",
        password: "",
    });
    const [errorMsg, setErrorMsg] = useState([]);
    
    async function handleSubmit(e) {
        e.preventDefault();
        const loginResult = await login(identifier);
        if (loginResult.isLogged === true) {
            setErrorMsg([]);
            console.log(loginResult)
            sessionStorage.setItem('isLogged', JSON.stringify(true));
            sessionStorage.setItem('userId', loginResult.content);
            console.log(sessionStorage)
            closeModal();
        }else if (loginResult.isLogged === null) {
            setErrorMsg(['Identifiants invalides']);
        } else {
            setErrorMsg([`Une erreur s'est produite lors de la connxion, veuillez réessayer plus tard.`]);
        }
    }
    
    return (
        <form onSubmit={handleSubmit}>
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