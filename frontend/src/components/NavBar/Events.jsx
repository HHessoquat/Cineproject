import { useState } from 'react';
import { Link } from 'react-router-dom';

function Events() {
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
                className="NavBarDropDownButton"
                onClick={toggleDropdown}
                onBlur={handleBlur}
            >
                <img className='navPicto' src="/img/picto/Event.png" alt="liens vers la page événement"/>
                <p className="navText">Evénements</p>
            </button>
            {isDropdownOpen && (
                <ul className="navDropdownLinks">
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
