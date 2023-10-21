function EventsSlider({ movies }) {
    console.log(movies);
    const events =  [
        movies.wednesdaySessions[0],
        movies.fridaySessions[0],
        ];
    movies.premiereSessions[0] && events.push(movies.premiereSessions[0]);

    events.sort((a, b) => {
        const parseDate = (dateString) => {
            const [datePart, timePart] = dateString.split(" ");
            const [year, month, day] = datePart.split("-");
            const [hour, minute, second] = timePart.split(":");
            return new Date(year, month - 1, day, hour, minute, second);
        };

    const aDate = parseDate(a.sessions.split(', ')[0]);
    const bDate = parseDate(b.sessions.split(', ')[0]);

    return aDate - bDate;
});
        console.log(events);
        return(
            <>
               <img src={events[0].coverImgUrl} alt={events[0].coverImgAlt} />
            </>
            )
}

export default EventsSlider