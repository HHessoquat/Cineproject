import {useState, useEffect} from 'react';
import EventSlide from './EventSlide';

function EventsSlider({ movies }) {
    const events =  [];
    movies.wednesdaySessions[0] && events.push(movies.wednesdaySessions[0]);
    movies.fridaySessions[0] && events.push(movies.fridaySessions[0]);
    movies.premiereSessions[0] && events.push(movies.premiereSessions[0]);
    const [activeSlide, setActiveSlide] = useState(0);
    
    events.sort((a, b) => {
    return a.sessions[0] - b.sessions[0];
    });
    
     useEffect(() => {
        const interval = setInterval(() => {
          const newSlide = activeSlide === events.length - 1 ? 0 : activeSlide + 1;
          setActiveSlide(newSlide);
        }, 5000);
    
        return () => clearInterval(interval);
      }, [activeSlide, events.length]);

    return(
        <div className="eventsSlider" role="region" aria-label="Les prochains événements">
            
            {events.map((c, i)=> (
                <EventSlide
                    key={i}
                    isActive={i === activeSlide}
                    events={events}
                    movie={events[i]}
                    activeSlide={activeSlide}
                    setActiveSlide={setActiveSlide}
    
                />
            )) }

        </div>
        )
}

export default EventsSlider