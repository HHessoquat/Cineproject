import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DocumentMeta from 'react-document-meta';
import { AuthentificationProvider } from './utils/context';
import NavBar from './components/NavBar/NavBar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Home from './pages/Home';
import Movie from './pages/Movie';
import Events from './pages/Events';
import Practical from './pages/Practical';
import BackOfficeLanding from './pages/BackOffice';
import MovieDetail from './pages/MoviesManagement/MovieDetail.jsx';
import Legal from './pages/Legal';
import Error401 from './pages/Errors/Unauthorized.jsx';
import Error403 from './pages/Errors/Forbidden.jsx';
import Error404 from './pages/Errors/NotFound.jsx';

function App() {
    const meta = {
        title: 'CineProject',
        description: "Explorez l'univers du CineProject, un cinéma de quartier dynamique élargissant son offre cinématographique avec des événements hebdomadaires captivants. Découvrez nos séances du mercredi pour les enfants et les vendredis cultes pour les cinéphiles, proposant des films iconiques et des débats stimulants. ",
        canonical: 'http://jeremydequeant.ide.3wa.io:3000/',
        meta: {
            name: {
                keywords: 'cinema,films jeunesse,films cultes,sortie,Rezé'
            }
        }
    }
    return (
        <>
            <DocumentMeta {...meta} />
            <Router>
                <AuthentificationProvider>
                    <NavBar />
                    
                        <Routes>
                        
                            <Route path="/" element={<Home />} />
                            <Route path="/film/:idMovie" element={<Movie />} />
                            <Route path="/evenements/:event" element={<Events />} />
                            <Route path="/pratique" element={<Practical />} />
                            <Route path='/admin/home' element={<BackOfficeLanding />} />
                            <Route path='/admin/movie/:id' element={<MovieDetail />} />
                            <Route path="/legal" element={<Legal />} /> 
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
