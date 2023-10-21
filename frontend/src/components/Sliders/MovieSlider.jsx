import {useState} from 'react';
import MovieCard from '../Movies/MovieCard';
function MovieSlider({movieRow}) {
    const [currentImage, setCurrentImage] = useState(0);
    
    const scrollLeft = () => {
    if (currentImage > 0) {
      setCurrentImage(currentImage - 1);
    }
  };

  const scrollRight = () => {
    if (currentImage < movieRow.length - 1) {
      setCurrentImage(currentImage + 1);
    }
  };
    return(
        <section className='movieRow'>
            <div className="movableContainer" style={{ transform: `translateX(-${currentImage * 250}px)` }} >
                {movieRow.map((c, i) => {
                console.log(c);
                    return (
                        <article key={i} className='movieInRow'>
                            <MovieCard movie={c} />
                        </article>
                    )
                    
                })}
            </div>
            <div className='movieSliderBtnContainer'>
                {currentImage > 0 && <button className="movieSliderBtn sliderButtonLeft" onClick={scrollLeft}>&lt;</button>}
                {currentImage < movieRow.length - 1 && <button className="movieSliderBtn sliderButtonRight" onClick={scrollRight}>&gt;</button>}
            </div>
        </section>
        )
}
export default MovieSlider