import { useState } from 'react';
import UserForm from '../Forms/UserManagementForm.jsx';

function PrintAllUser({allUsers, setAllUsers, getAll, handleDelete}) {
    const [userUpdate, setUserUpdate] = useState('');
    function handleUpdateButton(userId) {
        if (userUpdate === userId) {
            setUserUpdate('');
        }else {
            setUserUpdate(userId);
        }
    }
    return(
        <>
            {allUsers && allUsers.map((user, i) => {
                return (
                    <div key={i}>
                        <p>
                            {user.firstName} 
                            <button onClick={() => handleUpdateButton(user.id)}>{userUpdate === user.id ? 'Annuler' : 'Modifier'}</button>
                            <button type="button" onClick={() => handleDelete(user.id)} >Supprimer</button>
                        </p>
                        {user.id === userUpdate && <UserForm update={true} id={user.id} currentUser={user} />}
                    </div>
                    )
            })}
        </>)
}
export default PrintAllUser