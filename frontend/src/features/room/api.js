export function postRoom(roomName, room, validateDatas, setErrorMsg) {
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
        fetch(`http://jeremydequeant.ide.3wa.io:9000/api/room/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        }).then((response) => response.json().then((data) => console.log(`réponse de l'api : ${data.message}`)));
    }