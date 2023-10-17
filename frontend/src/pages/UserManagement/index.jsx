import { useState } from 'react';
import FetchUser from '../../components/Forms/FetchUserForm.jsx';
import UserManagementForm from '../../components/Forms/UserManagementForm.jsx';

function UserManagement() {
    const [action, setAction] = useState(0);
    const [allUsers, setAllUsers] = useState([]);
    const [user, setUser] = useState({});
    const [isUpdateOpen, setIsUpdateOpen] = useState(false); 
    
    function handleChange(e) {
        setAction(Number(e.target.value));
    }
    return(
        <>
            <form onSubmit={(e) => e.preventDefault()}>
                  <label>
                    <input
                      type="radio"
                      name="action"
                      value={0}
                      checked={action === 0}
                      onChange={handleChange}
                    />
                    Chercher un membre
                  </label>
            
                  <label>
                    <input
                      type="radio"
                      name="action"
                      value={1}
                      checked={action === 1}
                      onChange={handleChange}
                    />
                    Creer un membre
                  </label>
            </form>
            {action === 0 && <FetchUser 
                                  setAllUsers={setAllUsers}
                                  setUser={setUser}
                                  user={user}
                                  allUsers={allUsers} 
                                  update={isUpdateOpen}
                                  setUpdate={setIsUpdateOpen}
                              />}
            {action === 1 && <UserManagementForm />}
        </>
        )
}

export default UserManagement;