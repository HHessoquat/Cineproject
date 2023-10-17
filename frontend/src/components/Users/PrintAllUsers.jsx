import {Link} from 'react-router-dom';

function PrintAllUser({allUsers}) {
    
    function handleDelete(id) {
        console.log(id);
    }
    return(
        <>
            {allUsers && allUsers.map((user, i) => {
                return (
                    <p key={i}>{user.firstName} <Link to={`updateUser/${user.id}`}>Modifier</Link> <button type="button" onClick={() => handleDelete(user.id)} >Supprimer</button></p>
                    )
            })}
        </>)
}
export default PrintAllUser