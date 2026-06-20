import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({ children }) => {
    const [favourites, setFavourites] = useState([])

    useEffect(() => {
        const storedFavs=localStorage.getItem("favorites");

        if (storedFavs) setFavourites(JSON.parse(storedFavs));
    }, [])

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favourites));
    }, [favourites]);

    const addFavourites = (movie) => {
        setFavourites(prev => [...prev, movie]);
    }

    const removeFavourite = (movieId) => {
        setFavourites(prev => prev.filter(movie  => movie.id !==movieId));
    }

    const isFavorite = (movieId) => {
        return favourites.some(movie => movie.id === movieId);
    }

    const value = {
        favourites,
        addFavourites,
        removeFavourite,
        isFavorite
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}
