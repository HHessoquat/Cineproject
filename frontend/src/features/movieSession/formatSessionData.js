import { dateToStringWDM } from '../../utils/dateFormat/dateToString.js';
import formatTime from '../../utils/dateFormat/formatTime.js';

function formatSessionData(allSessions){
        const dataCopy  = JSON.parse(JSON.stringify(allSessions));
        
        const formatedData = dataCopy.map((c) => {
            c.date = dateToStringWDM(c.date);
            c.time = formatTime(c.time);

            return c;
        });
        return formatedData;
    }
    
export default formatSessionData;