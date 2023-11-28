import dateToString from '../../utils/dateFormat/dateToString.js';
import formatTime from '../../utils/dateFormat/dateToString.js';
function formatSessionData(allSessions){
        const dataCopy  = [...allSessions];
        const formattedData = dataCopy.map((c) => {
            c.date = dateToString(c.date);
            c.time = formatTime(c.time);
            return c;
        });
        return formattedData;
    }
    
export default formatSessionData;