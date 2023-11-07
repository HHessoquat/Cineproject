import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import closeDropDown from '../../utils/dropdowns/close.js';

function Events() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const eventMenu = useRef(null);
    
    function openDropdown() {
        setIsDropdownOpen(true);
        closeDropDown(eventMenu, () => setIsDropdownOpen(false));
    }
    
    return (
        <div className="navDropdown">
            <button
                className="NavBarDropDownButton"
                onClick={openDropdown}
            >
                <img className='navPicto' src="/img/picto/Event.png" alt="liens vers la page événement"/>
                <span className="navText">Evénements</span>
            </button>
            {isDropdownOpen && (
                <ul ref={eventMenu} className="navDropdownLinks">
                    <li>
                        <Link to="/evenements/premiere">Avant-premières</Link>
                    </li>
                    <li>
                        <Link to="/evenements/friday">
                            Les vendredis cultes
                        </Link>
                    </li>
                    <li>
                        <Link to="/evenements/wednesday">
                            Le mercredi des enfants
                        </Link>
                    </li>
                </ul>
            )}
        </div>
    );
}
export default Events;
