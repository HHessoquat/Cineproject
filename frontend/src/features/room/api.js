export async function sendRoom(method, roomName, room, validateDatas, setErrorMsg, id=null) {
    try{
        const dataToSend= {
            name: roomName,
            nbSeats: room.capacity,
            seatsDisplay: room.seatsSetting,
        }
        const errors = validateDatas(dataToSend);
        if (errors.length !== 0) {
            setErrorMsg(errors);
            return;
        }
        const queryString = method === 'POST' ? `http://jeremydequeant.ide.3wa.io:9000/api/room/` : `http://jeremydequeant.ide.3wa.io:9000/api/room/${id}`;
        
        const response = await fetch(queryString, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        });
        
        const data = await response.json();
        console.log(`réponse de l'api : ${data.message}`);
    }catch (err) {
        console.log(err)
    }
        
    }
    
export async function fetchOneRoom(id, setRoom) {
        try{
            const response = await fetch(`http://jeremydequeant.ide.3wa.io:9000/api/room/${id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            });
            const room = await response.json();
            const parsedRoom = {...room.result[0], seatsDisplay: JSON.parse(room.result[0].seatsDisplay)}
            setRoom(parsedRoom);
        }catch (err) {
            console.log(err);
        }
    }
    