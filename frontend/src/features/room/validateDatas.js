export default (datas) => {
    // name: roomName,
    //         nbSeats: room.capacity,
    //         seatsDisplay: room.seatsSetting,
    const errors = [];
    if (!datas.name){
        errors.push('La salle doit avoir un nom');
    }
    if (!datas.nbSeats){
        errors.push('La salle ne peut pas être Vide');
    }
    if (!datas.seatsDisplay){
        errors.push('La salle doit avoir des siège');
    }
    return errors;
}