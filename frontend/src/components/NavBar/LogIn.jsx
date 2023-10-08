import { useState } from 'react';
import { Link } from 'react-router-dom';

function LogIn() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    function toggleDropdown() {
        isDropdownOpen ? setIsDropdownOpen(false) : setIsDropdownOpen(true);
    }
    function handleBlur() {
        setIsDropdownOpen(false);
    }
    return (
        <div className="navDropdown">
            <button
                className="NavBArDropDownButton"
                onClick={toggleDropdown}
                onBlur={handleBlur}
            >
                <img
                    id="userLogInPicto"
                    src="/picto/user.png"
                    alt="picto utilisateur"
                />
            </button>
            {isDropdownOpen && (
                <ul className="navDropdownLinks">
                    <li>
                        <Link to="/LogIn">Mon Compte</Link>
                    </li>
                    <li>
                        <Link to="/SignIn">Créer mon compte</Link>
                    </li>
                </ul>
            )}
        </div>
    );
}
export default LogIn;
