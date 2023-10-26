import { Link } from 'react-router-dom';

function EventSlide({events, movie, activeSlide, setActiveSlide, timeoutId}) {
    const eventName = movie.event === 'wednesday' ? 'Le Mecredi des enfants' : movie.event === 'friday' ? 'Les Vendredis culte' : 'Avant-Première';
    function toggleSlide(index) {
        setActiveSlide(index);
        clearTimeout(timeoutId);
    }
    console.log(movie)
    return(
        <section  className="eventSliderWrapper">
            <figure key={Math.random()*100} className="sliderTransition">
                <Link to={`/evenements/${movie.event}`} className='sliderEventLink'>
                    <img id="eventSliderCover" src={movie.coverImgUrl} alt={movie.coverImgAlt} />
                    <figcaption >
                        <h2>{eventName}</h2>
                        <h3 id="eventSliderTitle">
                            {movie.title}
                        </h3>
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
                </Link>
            </figure>
            <div className='sliderBtn'>
                {events.map((c, i) => {
                    return (
                        <button 
                            key={i} 
                            type="button" 
                            className={`eventSliderBtn ${activeSlide === i ? 'active' : ''}`} 
                            onClick={() => toggleSlide(i)} 
                        > 
                        </button>
                    )}
                )}
            </div>
            
            
        </section>
        )
}

export default EventSlide