import { useState } from 'react';
import handleChange from '../../utils/formsManagement/handleChange.js';
import { getAllUsers, getUserByPseudo} from '../../features/user/api.js';
import PrintUserModal from './PrintUserModal.jsx';
import PrintAllUsers from './PrintAllUsers.jsx';
import { deleteUser } from '../../features/user/api.js';
import { validateFetchUser } from '../../features/user/validateUserForm.js';

function FetchUser({setAllUsers, setUser, allUsers, user, setUpdate}) {
    const [userSeeked, setUserSeeked] = useState({
        pseudo: '',
    });
    const [noUser, setNoUser] = useState(false);
    const [errorMsg, setErrorMsg] = useState([]);

    async function getAll() {
        setNoUser(false);
        setUser({});
        const users= await getAllUsers();
        if (users === null) {
            setNoUser(true);
            return
        }
        setAllUsers(users);
    }
    
    async function handleDelete(id) {
        await deleteUser(id);
        setUser({});
        getAll()
    }
    
    async function handleSubmit(e) {
        setNoUser(false);
        setAllUsers([]);
        e.preventDefault();
        
        const errors = validateFetchUser(userSeeked.pseudo);
        if (errors.length > 0) {
            console.log(errors)
            setErrorMsg(errors);
            return;
        }

        const retrievedUser = await getUserByPseudo(userSeeked.pseudo);
        if (retrievedUser === null) {
            setNoUser(true);
            return
        }
        
        setUser(retrievedUser[0]);
    }
    
    return (
        <>
            {errorMsg && errorMsg.map((c, i) => {
               return <p key={i}> {c} </p>
            })}
            <form className="backofficeForm searchForm" onSubmit={handleSubmit}>
                <div className="inputContainer">
                    <label className="searchInput">
                        pseudo
                        <input type="text" id="pseudonyme" name="pseudo" value={userSeeked.named} onChange={(e) => handleChange(e, setUserSeeked, setErrorMsg)} />
                    </label>
                </div>

                <input className="backofficeBtn backofficeFormBtn" type="submit" value="chercher" />
                <button className="backofficeBtn backofficeFormBtn" type="button" onClick={getAll}> afficher tous les utilisateurs </button>
            </form>
            
            
            {noUser && <p>aucun utilisateur n'a été trouvé</p>}
            
            {!noUser && allUsers[0] && <PrintAllUsers 
                                            allUsers={allUsers}
                                            setAllUsers={setAllUsers} 
                                            getAll={getAll} 
                                            handleDelete= {handleDelete}
                                        /> }
            
            {!noUser && user.name && <PrintUserModal 
                                        user={user}
                                        handleDelete= {handleDelete}
                                    />}
        </>
        )
}

export default FetchUser