function PrintUserModal({user}) {
        console.log(user)
    return(
        <div className='userModal'>
            <p>Nom : {user.name}</p>
            <p>Prénom : {user.firstName}</p>
            <p>E-mail : {user.email}</p>
            <p>pseudo : {user.pseudo}</p>
            <p>statut: {user.role}</p>
        </div>
        )
}

export default PrintUserModal