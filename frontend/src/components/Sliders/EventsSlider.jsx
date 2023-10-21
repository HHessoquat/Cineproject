import { useState } from 'react';
import EventSlide from './EventSlide';

function EventsSlider({ movies }) {
    const events =  [
        movies.wednesdaySessions[0],
        movies.fridaySessions[0],
        ];
    movies.premiereSessions[0] && events.push(movies.premiereSessions[0]);
    const [activeSlide, setActiveSlide] = useState(0);
    
    events.sort((a, b) => {

    return a.sessions[0] - b.sessions[0];
    });

    function sliderAnimation() {
        if (activeSlide === events.length -1) {
            setActiveSlide(0);
            return
        } 
        setActiveSlide(activeSlide + 1);
    }
    const timeoutId = setTimeout(sliderAnimation, 4000);
    
    return(
        <>
            
            <EventSlide
                events={events}
                movie={events[activeSlide]}
                setActiveSlide={setActiveSlide}
                timeoutId={timeoutId}
            />

        </>
        )
}

export default EventsSlider