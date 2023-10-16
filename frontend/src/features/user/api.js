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
        const data = response.json()
        console.log(data.response);
    } catch (err) {
        console.log(err);
    }
}