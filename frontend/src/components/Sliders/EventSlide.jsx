function EventSlide({events, movie, setActiveSlide, timeoutId}) {
    
    function toggleSlide(index) {
        setActiveSlide(index);
        clearTimeout(timeoutId);
    }
    return(
        <section className="eventSliderWrapper">
            <h2 id="eventSliderTitle">
                {movie.title}
            </h2>
            <p>{movie.sessions[0].getDate()}/{movie.sessions[0].getMonth() + 1} </p>
            <p>{movie.sessions[0].getHours() < 10 ? `0${movie.sessions[0].getHours()}` : movie.sessions[0].getHours().toString()}:
            {movie.sessions[0].getMinutes() < 10 ? `0${movie.sessions[0].getMinutes()}` : movie.sessions[0].getMinutes().toString()} </p>
            <img id="eventSliderCover" src={movie.coverImgUrl} alt={movie.coverImgAlt} />
            
            {events.map((c, i) => {
                return (
                <button 
                    key={i} type="button" 
                    className="EventSliderBtn" 
                    onClick={() => toggleSlide(i)} 
                > 
                    {i} 
                </button>
                )}
            )}
        </section>
        )
}

export default EventSlide