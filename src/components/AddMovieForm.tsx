// AddMovieForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { Add } from '../store/movieSlice';
import { movieSchema, MovieFormData } from '../schemas/MovieSchema';

const AddMovieForm: React.FC = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<MovieFormData>({
    resolver: zodResolver(movieSchema),
  });

  const onSubmit = (data: MovieFormData) => {
    dispatch(Add({ id: Date.now(), name: data.name, rating: data.rating, genre: data.genre }));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-4 py-5">
      <div className='flex items-center gap-2'>
        <p className='text-lg'>Name:</p>
        <input
          type="text"
          placeholder="Movie Name"
          {...register('name')}
          className="border p-2 rounded w-full"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      
      <div className='flex items-center gap-2'>
        <p className='text-lg'>Rating:</p>
        <input
          type="number"
          placeholder="Rating (1-10)"
          {...register('rating', { valueAsNumber: true })}
          className="border p-2 rounded w-full"
        />
        {errors.rating && <p className="text-red-500">{errors.rating.message}</p>}
      </div>

      <div className='flex items-center gap-2'>
        <p className='text-lg'>Genre:</p>
        <input
          type="text"
          placeholder="Genre"
          {...register('genre')}
          className="border p-2 rounded w-full"
        />
        {errors.genre && <p className="text-red-500">{errors.genre.message}</p>}
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Movie
      </button>
    </form>
  );
};

export default AddMovieForm;
