import { useState } from 'react';
import ModalContainer from '../Modals/ModalContainer';
import UpdateUser from './UserManagementForm';

function PrintUserModal({user, handleDelete}) {
    const [updating, setUpdating] = useState(false);
    
    function toggleUpdate() {
        setUpdating(!updating);
    }
    return(
        <>
            <div>
                <p>Nom : {user.name}</p>
                <p>Prénom : {user.firstName}</p>
                <p>E-mail : {user.email}</p>
                <p>pseudo : {user.pseudo}</p>
                <p>statut: {user.role}</p>
                <div className="managementBtnContainer">
                    <button className="backofficeBtn" onClick={toggleUpdate}>Modifier</button>
                    <button className="backofficeBtn" type="button" onClick={() => handleDelete(user.id)} >Supprimer</button>
                </div>
            </div>
            {updating ? <ModalContainer close={() => setUpdating(false)}>
                            <UpdateUser 
                                update={updating}
                                id={user.id}
                                currentUser={user} 
                                closeModal={() => setUpdating(false)}
                                isInFrontOffice= {false}
                                />
                           </ModalContainer> 
                           : ""}
        </>
        )
}

export default PrintUserModal