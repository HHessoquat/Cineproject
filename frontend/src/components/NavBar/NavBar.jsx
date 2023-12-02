import { Link } from 'react-router-dom';
import Login from './LogIn';
import Events from './Events';
import Accessibility from './Accessibility';

function NavBar() {
    return (
        <nav className="navBarContainer" role="navigation" aria-label="Menu principal">
            <ul className="navBar">
                <li>
                    <Link to="/" id="homeLink" aria-label="Accueil">
                        <img className='logoPicto' src="/img/picto/logo_min_claire.png" alt='logo de cinéproject' />
                    </Link>
                </li>
                
                <li>
                    <Events />
                </li>
                
                <li>
                    <Link to="/pratique" id="practicalLink" aria-label="Infos pratiques">
                        <img className='navPicto' src="/img/picto/Location.png" alt="Lien vers la page infos pratiques" />
                        <span className="navText">Infos pratiques</span>
                    </Link>
                </li>
                
                <li>
                    <Accessibility />
                </li>
                
                <li>
                    <Login />
                </li>
            </ul>
            
        </nav>
    );
}

export default NavBar;
