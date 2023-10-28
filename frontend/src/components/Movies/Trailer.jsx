function Trailer({trailer, closeLecter}) {
    return(
        <>
            <button type="button" className="closeTrailerBtn" onClick={closeLecter}>x</button>
           <video id="trailerReader" controls={true} autoPlay={true} src={trailer} onBlur={closeLecter} ></video>
       </>
        )
}

export default Trailer