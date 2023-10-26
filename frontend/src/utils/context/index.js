import { createContext, useState, useEffect } from 'react';

export const AuthentificationContext = createContext();

export const AuthentificationProvider = ({children}) => {
    const [isLogged, setIsLogged] = useState(false);
    const [connectedUser, setConnectedUser] = useState("");
    const [role, setRole] = useState('user');
    useEffect(() => {
        
        if(sessionStorage.getItem('isLogged') && sessionStorage.getItem('userId') ) {
        setIsLogged(sessionStorage.getItem('isLogged'));
        setConnectedUser(sessionStorage.getItem('userId'));
    }
    }, [])
    
    
    return(
        <AuthentificationContext.Provider value={{isLogged, setIsLogged, connectedUser, setConnectedUser, role, setRole}}>
            {children}
        </AuthentificationContext.Provider>
        );
}