import { deleteUser } from '../../features/user/api.js';
function PrintAllUser({allUsers, setUpdate, update, setAllUsers, getAll}) {
    
    async function handleDelete(id) {
        await deleteUser(id);
        getAll()
    }
    function toggleUpdate() {
        setUpdate(!update)
    }
    return(
        <>
            {allUsers && allUsers.map((user, i) => {
                return (
                    <p key={i}>{user.firstName} <button onClick={toggleUpdate}>{update ? 'Annuler' : 'Modifier'}</button> <button type="button" onClick={() => handleDelete(user.id)} >Supprimer</button></p>
                    )
            })}
        </>)
}
export default PrintAllUser