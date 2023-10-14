import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Movie from './pages/Movie';
import NavBar from './components/NavBar/NavBar.jsx';
import Movies from './pages/Movies';
import Events from './pages/Events';
import Practical from './pages/Practical';
import MoviesManagement from './pages/MoviesManagement';
import UpdateMovie from './pages/MoviesManagement/UpdateMovie.jsx';
import CreateSession from './components/Forms/addSessionForm.jsx';
import RoomManagement from './pages/RoomsManagement';
import UpdateRoom from './pages/RoomsManagement/UpdateRoom.jsx';

function App() {
    return (
        <>
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/film/:idMovie" element={<Movie />} />
                    <Route path="/films" element={<Movies />} />
                    <Route path="/evenements" element={<Events />} />
                    <Route path="/pratique" element={<Practical />} />
                    <Route path="/moviesManagement" element={<MoviesManagement />} />
                    <Route path="/updateMovie/:idMovie" element={<UpdateMovie />} />
                    <Route path="/roomsManagement" element={<RoomManagement />} />
                    <Route path="/roomsManagement/updateRoom/:id" element={<UpdateRoom />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
