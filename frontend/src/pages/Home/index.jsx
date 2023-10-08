import { Link } from 'react-router-dom';
import MovieManagerForm from '../MoviesManagement/MovieManagerForm.jsx';
import RoomGenerator from '../../components/ordering/RoomGenerator.jsx';
// import { useState, useEffect } from 'react';
function Home() {
    // const [movie, setMovie] = useState({});
    // useEffect(() => {
    //     fetch(`http://localhost:3000/api/movies`)
    //         .then((response) => {
    //             response.json().then((movie) => setMovie(movie));
    //         })
    //         .catch((error) => console.log(error));
    // }, []);

    return <MovieManagerForm />;
    // return <RoomGenerator />
}
export default Home;
