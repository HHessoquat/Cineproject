import {useState, useContext, useEffect} from 'react';
import { AuthentificationContext } from '../../utils/context';
import MoviesManagement from '../MoviesManagement';
import RoomsManagement from '../RoomsManagement';
import UserManagement from '../UserManagement';
import Unauthorized from '../Errors/Unauthorized';
import Forbidden from '../Errors/Forbidden';
import { getUserById } from '../../features/user/api.js';

function BackOfficeLanding() {
    const [loadedPage, setLoadedPage] = useState(0);
    const [user, setUser] = useState(null);
    const {isLogged, connectedUser} = useContext(AuthentificationContext);
    
    async function fetchUser() {
        const userFetched = await getUserById(connectedUser);
        setUser(userFetched);
    }
    useEffect(()=>{
        if (isLogged) {
            fetchUser();
        }
    }, [isLogged]);
    
   return (
      <>
        {(!isLogged || !user) && <Unauthorized />}
        {isLogged && user && (
          <>
            {user.role !== 'admin' && user.role !== 'moderator' ? <Forbidden /> : (
            <>
                <nav id="backOfficeNavBar">
                  <button className="backOfficeNavBtn" type="button" onClick={() => setLoadedPage(0)}>Gérer les films</button>
                  {user.role === 'admin' && (
                    <>
                      <button className="backOfficeNavBtn" type="button" onClick={() => setLoadedPage(1)}>Gérer les salles</button>
                      <button className="backOfficeNavBtn" type="button" onClick={() => setLoadedPage(2)}>Gérer les utilisateurs</button>
                    </>
                  )}
                </nav>
                {loadedPage === 0 && <MoviesManagement />}
                {loadedPage === 1 && <RoomsManagement />}
                {loadedPage === 2 && <UserManagement />}
            </>
            )}
          </>
        )}
      </>
    );
}

export default BackOfficeLanding