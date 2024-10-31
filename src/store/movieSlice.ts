import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Movie } from '../types/Movie';
import {MovieState} from '../types/MovieState'

const initialState: MovieState = {
  movies: [],
  Search: '',
  sortName: 'asc',
  Sort: 'name',
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    Add: (state, action: PayloadAction<Movie>) => {
      state.movies.push(action.payload);
    },
    Delete: (state, action: PayloadAction<number>) => {
      state.movies = state.movies.filter(movie => movie.id !== action.payload);
    },
    Search: (state, action: PayloadAction<string>) => {
      state.Search = action.payload; 
    },
    Sort: (state, action: PayloadAction<'name' | 'rating' | 'genre'>) => {
      if (state.Sort === action.payload) { 
        state.sortName = state.sortName === 'asc' ? 'desc' : 'asc'; 
      } else {
        state.Sort = action.payload; 
        state.sortName = 'asc'; 
      }
    },
  },
});

export const { Add, Delete, Search, Sort } = movieSlice.actions;
export default movieSlice.reducer;
