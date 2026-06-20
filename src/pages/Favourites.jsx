import "../css/Favourites.css"
import {useMovieContext} from "../contexts/MovieContext.jsx";
import MovieCard from "../components/MovieCard.jsx";

export default function Favourites() {
    const { favourites } = useMovieContext();

    if (favourites.length > 0) {
        console.log(favourites);
        return (
            <div className="favorites">
                <h2>Your Favorites</h2>
                <div className="movies-grid">
                    {favourites.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className={"favourites-empty"}>
            <h2>No Favourite movies yet</h2>
            <p>Start adding your favourite movies and they will appear here</p>
        </div>
    )

}