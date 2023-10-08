import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Movie from './pages/Movie';
import NavBar from './components/NavBar/NavBar.jsx';
import Movies from './pages/Movies';
import Events from './pages/Events';
import Practical from './pages/Practical';

function App() {
    return (
        <>
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/movie/:idMovie" element={<Movie />} />
                    <Route path="/films" element={<Movies />} />
                    <Route path="/evenements" element={<Events />} />
                    <Route path="/pratique" element={<Practical />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
