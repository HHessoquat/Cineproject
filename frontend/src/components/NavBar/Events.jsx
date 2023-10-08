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
                className="NavBArDropDownButton"
                onClick={toggleDropdown}
                onBlur={handleBlur}
            >
                Evénements
            </button>
            {isDropdownOpen && (
                <ul className="navDropdownLinks">
                    <li>
                        <Link to="/Events/premiere">Avant-premières</Link>
                    </li>
                    <li>
                        <Link to="/Events/Vendredi_cultes">
                            Les vendredis cultes
                        </Link>
                    </li>
                    <li>
                        <Link to="/Events/Vendredi_cultes">
                            Le mercredi des enfants
                        </Link>
                    </li>
                </ul>
            )}
        </div>
    );
}
export default Events;
