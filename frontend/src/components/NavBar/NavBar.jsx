import { Link } from 'react-router-dom';
import Login from './LogIn';
import Events from './Events';

function NavBar() {
    return (
        <nav className="navBarContainer">
            <ul className="navBar">
                <li>
                    <Link to="/" id="homeLink">
                        Accueil
                    </Link>
                </li>
                <li>
                    <Link to="/films" id="moviesLink">
                        Films
                    </Link>
                </li>
                <li>
                    <Events />
                </li>
                <li>
                    <Link to="/pratique" id="practicalLink">
                        Infos pratiques
                    </Link>
                </li>
            </ul>
            <Login />
        </nav>
    );
}

export default NavBar;
