import {useState, useRef, useEffect} from 'react';
import MovieCard from '../Movies/MovieCard';
function MovieSlider({movieRow, header}) {
    const [currentImage, setCurrentImage] = useState(0);
    const [movieCardWidth, setMovieCardWidth] = useState(null);
    const movieCardRef = useRef();
    const [isLastMovieOnScreen, setIsLastMovieOnScreen] = useState();
    
    useEffect(() => {
        if (movieCardRef.current){
            const movieCardWidth = movieCardRef.current.offsetWidth;
            setMovieCardWidth(movieCardWidth);
        }
    }, [movieCardRef.current]);
    
    useEffect(()=> {
        checkLastMovieOnScreen(false);
    }, [])
    
    function checkLastMovieOnScreen(willMoveLeft) {
        if (movieCardRef.current) {
            const containerRect = movieCardRef.current.getBoundingClientRect();
            const rightBorderPosition = containerRect.right;
            const nextRightBorderPosition = willMoveLeft ? rightBorderPosition + movieCardWidth : rightBorderPosition - movieCardWidth;

            setIsLastMovieOnScreen(nextRightBorderPosition <= window.innerWidth);
        }
    }
    
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

    return(
        <section aria-label={header}>
            <h2>{header}</h2>
                <div className='movieRow' role="region" aria-live="polite">
                    <div className='movieSliderBtnContainer'>
                        {currentImage > 0 &&
                            <button 
                                className={`movieSliderBtn sliderButtonLeft ${currentImage === 0 ? 'hiddenBtn' : ''} `}
                                onClick={scrollLeft}
                                disabled={currentImage === 0}
                                aria-label="aller vers la gauche"
                            >
                                &lt;
                                </button>
                        }
                        
                            <button 
                                className={`movieSliderBtn sliderButtonRight ${isLastMovieOnScreen ? 'hiddenBtn' : ''}`}  
                                onClick={scrollRight}
                                disabled={isLastMovieOnScreen}
                                aria-label="aller vers la droite"
                            >
                                &gt;
            
                            </button>
                            
                    </div>
                    
                    <div
                        className="movableContainer" 
                        style={{ transform: `translateX(-${currentImage * movieCardWidth}px)` }}
                        role="list"
                    >
                        {movieRow.map((c, i) => {
                            return (
                                <div key={i} className='movieInRow' ref={movieCardRef} role="listitem">
                                    <MovieCard movie={c} />
                                </div>
                            )
                            
                        })}
                    </div>
            </div>
        </section>
        )
}
export default MovieSlider