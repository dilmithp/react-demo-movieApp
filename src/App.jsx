import React, {useState,useEffect} from 'react'
import Search from "./components/Search.jsx";
const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
}
}


const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [movieList, setMovieList] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchMovies = async () => {
        setLoading(true);
        setErrorMessage('');
        try{
            const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
            const response = await fetch(endpoint, API_OPTIONS);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if(data.Response === "False") {
                throw new Error(data.Error || 'failed to fetch movies');
                setMovieList([]);
                return;
            }
            setMovieList(data.results || []);
        }catch (e) {
            console.error(`Error while fetching :${e}`);
            setErrorMessage(e.response.data);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMovies();
    },[]);
    return (
        <main>
            <div className="pattern">
                <div className="wrapper">
                    <header>
                        <img src="./hero.png" alt="heroIMG" />
                    <h1>Find Ur <span className="text-gradient">Favourite</span> Movies Here</h1>
                        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                    </header>
                    <section className="all-movies">
                        <h2>All Movies</h2>

                        {loading ? (
                            <p>Loading...</p>
                        ): errorMessage ? (
                            <p className="text-red-500">{errorMessage}</p>
                        ): (
                            <ul>
                                {movieList.map(movie => (
                                    <p key={movie.id} className='text-white'>{movie.title}</p>
                                    )
                                )}
                            </ul>
                        )};
                    </section>
                </div>
            </div>
        </main>
    )
}
export default App
