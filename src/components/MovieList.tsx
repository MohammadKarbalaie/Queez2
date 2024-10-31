import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { Movie } from '../types/Movie';
import { Delete, Search, Sort } from '../store/movieSlice';

const MovieList: React.FC = () => {
    const dispatch = useDispatch();
    const { movies, Search: movieSearchQuery, sortName: movieSortDirection, Sort: movieSortColumn } = useSelector((state: RootState) => state.movies);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(Search(e.target.value));
    };

    const handleSortChange = (column: 'name' | 'rating' | 'genre') => {
        dispatch(Sort(column));
    };

    const filteredMovies = movies
        .filter((movie: Movie) =>
            movie.name.toLowerCase().includes(movieSearchQuery.toLowerCase())
        )
        .sort((a: Movie, b: Movie) => {
            if (movieSortColumn === 'rating') {
                return movieSortDirection === 'asc' ? a.rating - b.rating : b.rating - a.rating;
            } else {
                return movieSortDirection === 'asc'
                    ? a[movieSortColumn].localeCompare(b[movieSortColumn])
                    : b[movieSortColumn].localeCompare(a[movieSortColumn]);
            }
        });

    return (
        <div className="mt-4">
            <input
                type="text"
                placeholder="Search..."
                value={movieSearchQuery}
                onChange={handleSearchChange}  
                className="border p-2 rounded w-full mb-4"
            />
            <table className="w-full border">
                <thead>
                    <tr>
                        <th
                            className="border p-2 cursor-pointer"
                            onClick={() => handleSortChange('name')}  
                        >
                            Title {movieSortColumn === 'name' && (movieSortDirection === 'asc' ? '↑' : '↓')}
                        </th>
                        <th
                            className="border p-2 cursor-pointer"
                            onClick={() => handleSortChange('rating')} 
                        >
                            Rating {movieSortColumn === 'rating' && (movieSortDirection === 'asc' ? '↑' : '↓')}
                        </th>
                        <th
                            className="border p-2 cursor-pointer"
                            onClick={() => handleSortChange('genre')}  
                        >
                            Genre {movieSortColumn === 'genre' && (movieSortDirection === 'asc' ? '↑' : '↓')}
                        </th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredMovies.map((movie) => (
                        <tr key={movie.id}>
                            <td className="border p-2">{movie.name}</td>
                            <td className="border p-2">{movie.rating}</td>
                            <td className="border p-2">{movie.genre}</td>
                            <td className="border p-2">
                                <button
                                    onClick={() => dispatch(Delete(movie.id))}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MovieList;
