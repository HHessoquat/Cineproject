export const parseDate = (dateString) => {
      
    const [datePart, timePart] = dateString.split(" ");
    const [year, month, day] = datePart.split("-");
    const [hour, minute, second] = timePart.split(":");

    return new Date(year, month - 1, day, hour, minute, second);
    
};