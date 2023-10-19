import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Movie from './pages/Movie';
import NavBar from './components/NavBar/NavBar.jsx';
import Movies from './pages/Movies';
import Events from './pages/Events';
import Practical from './pages/Practical';
import MoviesManagement from './pages/MoviesManagement';
import MovieDetail from './pages/MoviesManagement/MovieDetail.jsx';
import UpdateMovie from './pages/MoviesManagement/UpdateMovie.jsx';
import CreateSession from './components/Forms/addSessionForm.jsx';
import RoomManagement from './pages/RoomsManagement';
import UpdateRoom from './pages/RoomsManagement/UpdateRoom.jsx';
import UserManagement from './pages/UserManagement';
import { AuthentificationProvider } from './utils/context';

function App() {
    return (
        <>
            <Router>
                <AuthentificationProvider>
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
                            <Route path="/manageUser" element={<UserManagement />} />
                            <Route path ="/admin/movieDetail" element={MovieDetail} />
                            
                        </Routes>
                </AuthentificationProvider>
            </Router>
        </>
    );
}

export default App;
