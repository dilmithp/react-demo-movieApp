import React, {useState,useEffect} from 'react'
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import {useDebounce} from "react-use";
import {getTrendingMovies, updateSearchCount} from "./appwrite.js";

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
    const [debounceSearchTerm, setDebounceSearchTerm] = useState('');
    const [trendingMovies, setTrendingMovies] = useState([]);

    useDebounce(() => setDebounceSearchTerm(searchTerm), 500,[searchTerm]);

    const fetchMovies = async (query = '') => {
        setLoading(true);
        setErrorMessage('');
        try{
            const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
                :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
            const response = await fetch(endpoint, API_OPTIONS);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            // Remove the incorrect API response check
            setMovieList(data.results || []);

            if(query && data.results && data.results.length > 0){
                await updateSearchCount(query, data.results[0]);
            }
        }catch (e) {
            console.error(`Error while fetching: ${e}`);
            setErrorMessage(e.message || 'Failed to fetch movies');
        }finally {
            setLoading(false);
        }
    }

    const loadTrendingMovies = async () => {
        try{
            const movies = await getTrendingMovies();
            setTrendingMovies(movies); // Set trending movies, not movieList
        }catch (e) {
            console.error(`Error while fetching trending movies: ${e}`);
        }
    }

    useEffect(() => {
        fetchMovies(debounceSearchTerm);
    },[debounceSearchTerm]);

    useEffect(() => {
        loadTrendingMovies()
    },[])

    return (
        <main>
            <div className="pattern">
                <div className="wrapper">
                    <header>
                        <img src="./hero.png" alt="heroIMG" />
                        <h1>Find Ur <span className="text-gradient">Favourite</span> Movies Here</h1>
                        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                    </header>
                    {trendingMovies.length > 0 && (
                        <section className="trending">
                            <h2>Trending Movies</h2>
                            <ul>
                                {trendingMovies.map((movie,index) => (
                                    <li key={movie.$id}>
                                        <p>{index + 1}</p>
                                        <img src={movie.poster_url} alt={movie.title} />
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                    <section className="all-movies">
                        <h2>All Movies</h2>
                        {loading ? (
                            <Spinner />
                        ): errorMessage ? (
                            <p className="text-red-500">{errorMessage}</p>
                        ): (
                            <ul>
                                {movieList.map(movie => (
                                    <MovieCard key={movie.id} movie={movie} />
                                ))}
                            </ul>
                        )}
                    </section>
                </div>
            </div>
        </main>
    )
}

export default App
