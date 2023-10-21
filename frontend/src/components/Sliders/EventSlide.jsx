function EventSlide({events, movie, setActiveSlide, timeoutId}) {
    
    function toggleSlide(index) {
        setActiveSlide(index);
        clearTimeout(timeoutId);
    }
    return(
        <section className="eventSliderWrapper">
            <figure>
                <img id="eventSliderCover" src={movie.coverImgUrl} alt={movie.coverImgAlt} />
                <figcaption>
                    <h2 id="eventSliderTitle">
                        {movie.title}
                    </h2>
                    <p>
                        <time dateTime={movie.sessions[0].toISOString()}>{movie.sessions[0].getDate()}/{movie.sessions[0].getMonth() + 1}</time>
                    </p>
                    <p>
                        <time dateTime={movie.sessions[0].toISOString()}>
                            {movie.sessions[0].getHours() < 10 ? `0${movie.sessions[0].getHours()}` : movie.sessions[0].getHours().toString()}:
                            {movie.sessions[0].getMinutes() < 10 ? `0${movie.sessions[0].getMinutes()}` : movie.sessions[0].getMinutes().toString()}
                        </time>
                    </p>
                </figcaption>
                <div className='sliderBtn'>
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
                </div>
            </figure>
            
            
            
        </section>
        )
}

export default EventSlide