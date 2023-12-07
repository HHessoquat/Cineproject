import { Link } from 'react-router-dom';

function EventSlide({events, isActive, movie, activeSlide, setActiveSlide}) {
    const eventName = movie.event === 'wednesday' ? 'Le Mecredi des enfants' : movie.event === 'friday' ? 'Les Vendredis culte' : 'Avant-Première';
    function toggleSlide(index) {
        setActiveSlide(index);
    }
    
    return(
        <section  
            className={`eventSlide ${isActive ? 'activeSlide' : ''}`} 
            role="group" 
            aria-roledescription="Événement"
            aria-label={eventName}
        >
            
            <Link to={`/evenements/${movie.event}`} className='sliderEventLink'>

                <figure>
                    
                    <img className="eventSliderCover" src={movie.coverImgUrl} alt={movie.coverImgAlt} />
                    <figcaption >
                        <h2>{eventName}</h2>
                        <h3 className="eventSliderTitle">
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
                    
                </figure>
            </Link>
            <div className='sliderBtn' role="toolbar" aria-label="Navigation du slider">
                {events.map((c, i) => {
                    return (
                        <button 
                            key={i}
                            type="button" 
                            className={`eventSliderBtn ${activeSlide === i ? 'active' : ''}`} 
                            onClick={() => toggleSlide(i)} 
                            aria-label= {`slide ${i + 1}`}
                        > 
                        </button>
                    )}
                )}
            </div>
            
            
        </section>
        )
}

export default EventSlide