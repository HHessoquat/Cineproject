import { useState } from 'react';
import UserForm from './UserManagementForm.jsx';
import ModalContainer from '../Modals/ModalContainer.jsx';

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
                    <>
                        <div className="userContainer" key={i}>
                            <p className="userNameText">
                                {user.firstName} {user.name}
                            </p>
                                <div className="managementBtnContainer">
                                    <button className="backofficeBtn" onClick={() => handleUpdateButton(user.id)}>{userUpdate === user.id ? 'Annuler' : 'Modifier'}</button>
                                    <button className="backofficeBtn" type="button" onClick={() => handleDelete(user.id)} >Supprimer</button>
                                </div>
                        </div>
                        
                        {user.id === userUpdate && 
                            <ModalContainer close={() => setUserUpdate('')}>
                                <UserForm 
                                    update={true} 
                                    id={user.id} 
                                    currentUser={user} 
                                />
                            </ModalContainer>
                                
                        }
                    </>
                    
                    )
            })}
        </>)
}
export default PrintAllUser