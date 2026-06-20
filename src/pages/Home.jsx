import MovieCard from "../components/MovieCard.jsx";
import {useEffect, useState} from "react";
import "../css/Home.css"
import {getPopularMovies, searchMovie} from "../services/api.js";

export  function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [movies, setMovie] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const movies = await getPopularMovies();
                setMovie(movies)
            }
            catch (error) {
                console.log(error);
                setError("Failed to fetch movies");
            }
            finally {
                setLoading(false);
            }
        }
        fetchMovies();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        if (loading) return;

        setLoading(true);
        try {
            const searchResults = await searchMovie(searchQuery)
            setMovie(searchResults)
            setError(null);
        }
        catch (error) {
            console.log(error);
           setError("Failed to search movies");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="home">
            <form onSubmit={handleSubmit} className={"search-form"}>
                <input type={"text"}
                       placeholder={"Search for a movie..."}
                       className={"search-input"}
                       value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)}/>
                <button type="submit" className={"search-button"}>Search</button>
            </form>

            {error && <div className={"error-message"}>{error}</div>}

            {loading ? (<div className={"loading"}>Loading...</div>) :  (
                <div className="movies-grid">
                    {movies.map(movie => (
                        movie.title.toLowerCase().startsWith(searchQuery)
                        && (<MovieCard movie = {movie} key = {movie.id}/>)
                    ))}
                </div>
            )}

        </div>
    )
}