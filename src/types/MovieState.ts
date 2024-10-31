import {Movie} from '../types/Movie'
export interface MovieState {
    movies: Movie[];
    Search: string;
    sortName: 'asc' | 'desc';
    Sort: 'name' | 'rating' | 'genre';
  }