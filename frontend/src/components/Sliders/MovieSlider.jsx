import {useState, useRef, useEffect} from 'react';
import MovieCard from '../Movies/MovieCard';
function MovieSlider({movieRow}) {
    const [currentImage, setCurrentImage] = useState(0);
    const [movableContainerWidth, setMovableContainerWidth] = useState(null);
    const [movieCardWidth, setMovieCardWidth] = useState(null);
    const movableContainerRef = useRef();
    const movieCardRef = useRef();
    const [isLastMovieOnScreen, setIsLastMovieOnScreen] = useState();
    
    useEffect(() => {
        if (movableContainerRef.current) {
            const movableContainerWidth = movableContainerRef.current.offsetWidth;
            setMovableContainerWidth(movableContainerWidth);
        }
       
        if (movieCardRef.current){
            const movieCardWidth = movieCardRef.current.offsetWidth;
            setMovieCardWidth(movieCardWidth);
        }
    }, []);
    
    function checkLastMovieOnScreen(willMoveLeft) {
        if (movableContainerRef.current) {
            const containerRect = movieCardRef.current.getBoundingClientRect();
            const rightBorderPosition = containerRect.right;
            const nextRightBorderPosition = willMoveLeft ? rightBorderPosition + movieCardWidth : rightBorderPosition - movieCardWidth;
            setIsLastMovieOnScreen(nextRightBorderPosition <= window.innerWidth);
            console.log(willMoveLeft)
            console.log('rightBorder : ', rightBorderPosition)
            console.log('next : ',nextRightBorderPosition);
            console.log('returned : ',containerRect.right)
        }
    }
    
    //  useEffect(() => {
    //     setTimeout(checkLastMovieOnScreen, 3000);
    // }, [currentImage]);
  
    function scrollLeft() {
    if (currentImage > 0) {
        checkLastMovieOnScreen(true);
      setCurrentImage(currentImage - 1);
      
    }
  };

  function scrollRight() {
    if (currentImage < movieRow.length - 1) {
        checkLastMovieOnScreen(false);
        setCurrentImage(currentImage + 1);
      
    }
  };
     if (movableContainerRef.current) {
            const containerRect = movieCardRef.current.getBoundingClientRect();
 
            console.log(containerRect.right)
        }
    return(
        <section className='movieRow'>
            <div className='movieSliderBtnContainer'>
                {currentImage > 0 &&
                    <button 
                    className="movieSliderBtn sliderButtonLeft" 
                    onClick={scrollLeft}>&lt;</button>
                }
                
                {!isLastMovieOnScreen && 
                    <button 
                    className="movieSliderBtn sliderButtonRight" 
                    onClick={scrollRight}>&gt;</button>
                    
                }
            </div>
            
            <div ref={movableContainerRef} className="movableContainer" style={{ transform: `translateX(-${currentImage * movieCardWidth}px)` }} >
                {movieRow.map((c, i) => {
                    return (
                        <article key={i} className='movieInRow' ref={movieCardRef}>
                            <MovieCard movie={c} />
                        </article>
                    )
                    
                })}
            </div>
            
        </section>
        )
}
export default MovieSlider