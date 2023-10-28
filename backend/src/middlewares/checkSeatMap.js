function checkSeatMap(seatMap) {
        //check that seatMap is an array
    if (!Array.isArray(seatMap)) {
        return false;
    }
    
    // check that every item of seatMap is also an array
    for (const innerArray of seatMap) {
        if (!Array.isArray(innerArray)) {
            return false;
        }
        
        // check that the content of the coordinate is either a boolean or null
        for (const value of innerArray) {
            if (value !== null && typeof value !== 'boolean') {
                return false;
            }
        }
    }
    
    // if seatMap is a 2D array containg only true, false or null, the the input is validated
    return true;
}

module.exports = checkSeatMap