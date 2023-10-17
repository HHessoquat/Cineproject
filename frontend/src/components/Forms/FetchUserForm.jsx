import { useState } from 'react';
import handleChange from '../../utils/formsManagement/handleChange.js';
import { getAllUsers, getUserByPseudo} from '../../features/user/api.js';
import PrintUserModal from '../../components/Users/PrintUserModal.jsx';
import PrintAllUsers from '../../components/Users/PrintAllUsers.jsx';

function FetchUser({setAllUsers, setUser, allUsers, user}) {
    const [userSeeked, setUserSeeked] = useState({
        pseudo: '',
    });
    const [errorMsg, setErrorMsg] = useState([]);
    
    
    async function getAll() {
        const users= await getAllUsers();
        setAllUsers(users);
    }
    
    async function handleSubmit(e) {
        e.preventDefault();

        const retrievedUser = await getUserByPseudo(userSeeked.pseudo);
        setUser(retrievedUser[0]);
    }
console.log(allUsers)
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
            
            {allUsers[0] && <PrintAllUsers allUsers={allUsers} /> }
            
            {user.name && <PrintUserModal user={user} />}
        </>
        )
}

export default FetchUser