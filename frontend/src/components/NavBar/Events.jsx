import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import closeDropDownOnBlur from '../../utils/dropdowns/close.js';

function Events() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const eventMenu = useRef(null);
    
    function openDropdown() {
        setIsDropdownOpen(true);
        closeDropDownOnBlur(eventMenu, () => setIsDropdownOpen(false));
    }
    
    function closeMenu() {
        setIsDropdownOpen(false);
    }
    
    return (
        <div className="navDropdown" role="button" aria-haspopup="true" aria-expanded={isDropdownOpen ? 'true' : 'false'}>
            <button
                className="NavBarDropDownButton"
                onClick={openDropdown}
                aria-label="Evénements"
            >
                <img className='navPicto' src="/img/picto/Event.png" alt="liens vers la page événement"/>
                <span className="navText">Evénements</span>
            </button>
            {isDropdownOpen && (
                <ul ref={eventMenu} className="navDropdownLinks">
                    <li>
                        <Link to="/evenements/premiere" onClick={closeMenu}>Avant-premières</Link>
                    </li>
                    <li>
                        <Link to="/evenements/friday" onClick={closeMenu}>
                            Les vendredis cultes
                        </Link>
                    </li>
                    <li>
                        <Link to="/evenements/wednesday" onClick={closeMenu}>
                            Le mercredi des enfants
                        </Link>
                    </li>
                </ul>
            )}
        </div>
    );
}
export default Events;
