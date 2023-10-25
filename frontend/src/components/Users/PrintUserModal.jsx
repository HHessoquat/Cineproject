import { useState } from 'react'
function PrintUserModal({user, handleDelete}) {
    const [updating, setUpdating] = useState(false);
    
    function toggleUpdate() {
        setUpdating(!updating);
    }
    return(
        <div className='userModal'>
            <p>Nom : {user.name}</p>
            <p>Prénom : {user.firstName}</p>
            <p>E-mail : {user.email}</p>
            <p>pseudo : {user.pseudo}</p>
            <p>statut: {user.role}</p>
            <button onClick={toggleUpdate}>{updating ? 'Annuler' : 'Modifier'}</button>
            <button type="button" onClick={() => handleDelete(user.id)} >Supprimer</button>
        </div>
        )
}

export default PrintUserModal