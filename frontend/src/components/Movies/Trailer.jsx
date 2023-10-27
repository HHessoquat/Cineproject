function Trailer({trailer}) {
    return(
        <iframe 
            width="560" 
            height="315" 
            src={trailer}
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen
        >
        </iframe>
        )
}

export default Trailer