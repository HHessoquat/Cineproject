export async function postUser(userData) {
    try {
        const response = await fetch(`http://jeremydequeant.ide.3wa.io:9000/api/user/`, {
            method: "POST",
            headers: {
                'Accept' : 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        const data = await response.json()
        console.log(data.message);
    } catch (err) {
        console.log(err);
    }
}

export async function getAllUsers() {
    try {
        const response = await fetch('http://jeremydequeant.ide.3wa.io:9000/api/user/',{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
        });
        const data = await response.json();
        console.log(data.message)
        return data.content;
        
    }catch (err) {
        console.log(err);
    }
}

export async function getUSerById(userId) {
    try {
        const response = await fetch(`http://jeremydequeant.ide.3wa.io:9000/api/user/${userId}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json', 
            },
        });
        const data = await response.json();
        
        console.log(data.message);
        return data.content;
        
    }catch (err) {
        console.log(err);
    }
}
export async function getUserByPseudo(pseudo) {
    try {
        const response = await fetch(`http://jeremydequeant.ide.3wa.io:9000/api/user/byName/${pseudo}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json', 
                'Content-type': 'application/json',
            },
        });
        
        const data = await response.json();
        console.log(data.message);
        return data.content;
        
    }catch (err) {
        console.log(err);
    }
}

export async function updateUser(userId, user) {
    try {
        const response = await fetch(`http://jeremydequeant.ide.3wa.io:9000/api/user/${userId}`,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        const data = await response.json();
        
        console.log(data.message);
        return data.content;
        
    }catch (err) {
        console.log(err);
    }
}

export async function deleteUser(id) {
    try {
        const response = await fetch(`http://jeremydequeant.ide.3wa.io:9000/api/user/${id}`, {
            method : 'DELETE',
            headers: {
                'Accept' : 'application/json',
            }
        });
        const data = await response.json();
        console.log(data.message);
    }
    catch (err) {
        console.log(err)
    }
}

export async function login(identifier) {
    try {
        const response = await fetch(`http://jeremydequeant.ide.3wa.io:9000/api/user/login`, {
            method: 'POST',
            headers : {
                'Accept' : 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(identifier)
        });
        const data = await response.json();
        console.log(data.message);
        return data
    }catch (err) {
        console.log(err);
    }
}