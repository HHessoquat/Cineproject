import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Home from './pages/Home';
import Movie from './pages/Movie';
import Events from './pages/Events';
import Practical from './pages/Practical';
import BackOfficeLanding from './pages/BackOffice';
import MoviesManagement from './pages/MoviesManagement';
import MovieDetail from './pages/MoviesManagement/MovieDetail.jsx';
import UpdateMovie from './pages/MoviesManagement/UpdateMovie.jsx';
import CreateSession from './components/Forms/addSessionForm.jsx';
import RoomManagement from './pages/RoomsManagement';
import UserManagement from './pages/UserManagement';
import { AuthentificationProvider } from './utils/context';
import Error401 from './pages/Errors/Unauthorized.jsx';
import Error403 from './pages/Errors/Forbidden.jsx';
import Error404 from './pages/Errors/NotFound.jsx';

function App() {
    return (
        <>
            <Router>
                <AuthentificationProvider>
                    <NavBar />
                    
                        <Routes>
                        
                            <Route path="/" element={<Home />} />
                            <Route path="/film/:idMovie" element={<Movie />} />
                            <Route path="/evenements/:event" element={<Events />} />
                            <Route path="/pratique" element={<Practical />} />
                            <Route path='/admin/home' element={<BackOfficeLanding />} />
                            <Route path="/401" element={<Error401 />} /> 
                            <Route path="/403" element={<Error403 />} />
                            <Route path="*" element={<Error404 />} /> 
                        </Routes>
                    <Footer />
                </AuthentificationProvider>
            </Router>
        </>
    );
}

export default App;
