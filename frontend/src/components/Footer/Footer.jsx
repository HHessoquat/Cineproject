import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
function Footer() {
    return(
        <footer id="mainFooter">
            <nav id="legal">
                <ul>
                    <li><Link to="/legal">Mentions legales</Link></li>
                </ul>
            </nav>
            <nav id="socialsMedia">
            <ul>
                <li>
                    <a href="https://twitter.com/">
                        <FontAwesomeIcon icon={faTwitter} style={{color: "#ffffff", fontSize: '1.5em'}} />
                    </a>
                </li>
                <li>
                    <a href="https://facebook.com/">
                        <FontAwesomeIcon icon={faFacebook} style={{color: "#ffffff", fontSize: '1.5em'}} />
                    </a>
                </li>
                <li>
                    <a href="https://instagram.com/">
                        <FontAwesomeIcon icon={faInstagram} style={{color: "#ffffff", fontSize: '1.5em'}} />
                    </a>
                </li>
            </ul>
            </nav>
        </footer>
        );
}
export default Footer