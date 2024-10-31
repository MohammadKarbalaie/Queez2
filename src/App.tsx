import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import AddMovieForm from './components/AddMovieForm';
import MovieList from './components/MovieList';

const App: React.FC = () => {
  return (
    <div className="max-w-screen-xl mx-auto p-8 text-center">
      <Provider store={store}>
        <div className="mx-auto p-4 pb-20">
          <h1 className="text-2xl font-semibold mb-4">Movie Management</h1>
          <AddMovieForm />
          <MovieList />
        </div>
      </Provider>
    </div>
  )
}

export default App






