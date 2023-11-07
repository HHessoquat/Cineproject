import { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AuthentificationContext } from '../../utils/context';
import { logout as logUserOut } from '../../features/user/api';
import LoginForm from '../Forms/LoginForm';
import SigninForm from '../Users/UserManagementForm';
import ModalContainer from '../Modals/ModalContainer';
import closeDropDown from '../../utils/dropdowns/close';

function LogIn() {
    
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const { isLogged, connectedUser, setIsLogged, setConnectedUser, role, setRole } = useContext(AuthentificationContext);
    const loggedMenu = useRef(null);
    
    function logout() {
        setIsLogged(false);
        setConnectedUser('');
        sessionStorage.clear();
        logUserOut();
        setIsLoginOpen(false);
    }
    
    function openDropdown() {
        setIsLoginOpen(true);
        if (isLogged) {
            closeDropDown(loggedMenu, () => setIsLoginOpen(false));
        }
    }
    
    return (
        <>
            <div className="navDropdown" >
                <button
                    className="NavBarLoginButton"
                    onClick={openDropdown}
                    
                >
                    <img
                        id="userLogInPicto"
                        src="/img/picto/user.png"
                        alt="picto utilisateur"
                    />
                </button>
                {isLoginOpen && !isLogged &&  (
                    <ModalContainer close={() => setIsLoginOpen(false)}>
                        <LoginForm closeModal={() => setIsLoginOpen(false)} />
                        <SigninForm closeModal={() => setIsLoginOpen(false)} isInFrontOffice={true} />
                        <button type="button" onClick={() => setIsLoginOpen(false)} >Annuler</button>
                    </ModalContainer>
                )}
                {isLoginOpen && isLogged && (
                    <div ref={loggedMenu} className='navDropdownLinks' onBlur={() => setIsLoginOpen(false)}>
                        {(role === 'admin' || role === "moderator") && <Link to='/admin/home'>Espace administrateur</Link>}
                        <button type="button" onClick={logout}>Deconnexion</button>
                    </div>
                    )}
            </div>
        </>
    );
}
export default LogIn;
