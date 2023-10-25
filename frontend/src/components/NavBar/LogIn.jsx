import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthentificationContext } from '../../utils/context';
import { logout as logUserOut } from '../../features/user/api.js';
import LoginForm from '../Forms/LoginForm.jsx';
import SigninForm from '../Users/UserManagementForm.jsx';

function LogIn() {
    
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const { isLogged, connectedUser, setIsLogged, setConnectedUser } = useContext(AuthentificationContext);
    
    function logout() {
        setIsLogged(false);
        setConnectedUser('');
        sessionStorage.clear();
        logUserOut();
        setIsLoginOpen(false);
    }
    return (
        <>
            <div className="navDropdown" >
                <button
                    className="NavBarLoginButton"
                    onClick={() => setIsLoginOpen(!isLoginOpen)}
                    
                >
                    <img
                        id="userLogInPicto"
                        src="/img/picto/user.png"
                        alt="picto utilisateur"
                    />
                </button>
                {isLoginOpen && !isLogged &&  (
                <div className="userConnectionForm">
                    <LoginForm closeModal={() => setIsLoginOpen(false)} />
                    <SigninForm closeModal={() => setIsLoginOpen(false)} isInFrontOffice={true} />
                    <button type="button" onClick={() => setIsLoginOpen(false)} >Annuler</button>
                </div>
                )}
                {isLoginOpen && isLogged && (
                    <div className='navDropdownLinks' onBlur={() => setIsLoginOpen(false)}>
                        <Link to='userAccount'>Mon Compte</Link>
                        <button type="button" onClick={logout}>Deconnexion</button>
                    </div>
                    )}
            </div>
        </>
    );
}
export default LogIn;
