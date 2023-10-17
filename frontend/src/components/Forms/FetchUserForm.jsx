import { useState } from 'react';
import handleChange from '../../utils/formsManagement/handleChange.js';
import { getAllUsers, getUserByPseudo} from '../../features/user/api.js';
import PrintUserModal from '../../components/Users/PrintUserModal.jsx';
import PrintAllUsers from '../../components/Users/PrintAllUsers.jsx';

function FetchUser({setAllUsers, setUser, allUsers, user, update, setUpdate}) {
    console.log('passe in fetch')
    const [userSeeked, setUserSeeked] = useState({
        pseudo: '',
    });
    const [noUser, setNoUser] = useState(false);
    const [errorMsg, setErrorMsg] = useState([]);

    async function getAll() {
        setNoUser(false);
        const users= await getAllUsers();
        if (users === null) {
            setNoUser(true);
            return
        }
        setAllUsers(users);
    }
    
    async function handleSubmit(e) {
        setNoUser(false);
        e.preventDefault();

        const retrievedUser = await getUserByPseudo(userSeeked.pseudo);
        if (retrievedUser === null) {
            setNoUser(true);
            return
        }
        
        setUser(retrievedUser[0]);
    }
console.log(noUser);
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="inputContainer">
                    <label>
                        pseudo :
                        <input type="text" id="name" name="pseudo" value={userSeeked.named} onChange={(e) => handleChange(e, setUserSeeked, setErrorMsg)} />
                    </label>
                </div>

                <input type="submit" value="chercher" />
            </form>
            <button type="button" onClick={getAll}> afficher tout les utilisateurs </button>
            
            {noUser && <p>aucun utilisateur n'a été trouvé</p>}
            
            {!noUser && allUsers[0] && <PrintAllUsers 
                                            allUsers={allUsers} 
                                            setUpdate={setUpdate} 
                                            update={update} 
                                            setAllUsers={setAllUsers} 
                                            getAll={getAll} 
                                        /> }
            
            {!noUser && user.name && <PrintUserModal user={user} />}
        </>
        )
}

export default FetchUser