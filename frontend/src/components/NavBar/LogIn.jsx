import { useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AuthentificationContext } from '../../utils/context';
import { logout as logUserOut } from '../../features/user/api';
import LoginForm from '../Forms/LoginForm';
import SigninForm from '../Users/UserManagementForm';
import ModalContainer from '../Modals/ModalContainer';
import closeDropDownOnBlur from '../../utils/dropdowns/close';

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
            closeDropDownOnBlur(loggedMenu, () => setIsLoginOpen(false));
        }
    }
    
    function closeMenu() {
        setIsLoginOpen(false);
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
                    <ModalContainer close={() => setIsLoginOpen(false)} modalClass="loginComponent">
                        <LoginForm closeModal={() => setIsLoginOpen(false)} />
                        <SigninForm closeModal={() => setIsLoginOpen(false)} isInFrontOffice={true} />
                        <button type="button" className="closeLogin" onClick={() => setIsLoginOpen(false)} >X</button>
                    </ModalContainer>
                )}
                {isLoginOpen && isLogged && (
                    <div ref={loggedMenu} className='navDropdownLinks loginDropdown' onBlur={() => setIsLoginOpen(false)}>
                        {(role === 'admin' || role === "moderator") && <Link to='/admin/home' onClick={closeMenu}>Espace administrateur</Link>}
                        <button type="button" onClick={logout}>Deconnexion</button>
                    </div>
                    )}
            </div>
        </>
    );
}
export default LogIn;
