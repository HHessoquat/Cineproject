import { useState } from 'react';
import LoginForm from '../Forms/LoginForm.jsx';
import SigninForm from '../Forms/UserManagementForm.jsx';

function LogIn() {
 
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    return (
        <>
            <div className="navModal">
                <button
                    className="NavBArModalButton"
                    onClick={() => setIsLoginOpen(!isLoginOpen)}
                    
                >
                    <img
                        id="userLogInPicto"
                        src="/picto/user.png"
                        alt="picto utilisateur"
                    />
            </button>

            </div>
            {isLoginOpen &&  (
            <div className="userConnectionForm">
                <LoginForm closeModal={() => setIsLoginOpen(false)} />
                <SigninForm closeModal={() => setIsLoginOpen(false)}  />
                <button type="button" onClick={() => setIsLoginOpen(false)} >Annuler</button>
            </div>
            )}
            
        </>
    );
}
export default LogIn;
