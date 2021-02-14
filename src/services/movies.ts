import {SearchMovies, Movie, Review} from '../reducers/types'

const baseUrl = 'http://localhost:3001'

type ApiMovies = {
  Search?: SearchMovies
}

export const getMoviesByName = async (movieName: string): Promise<ApiMovies> => {
  const url = `${baseUrl}/search-movies?s=${movieName}`
  const movies = await fetch(url)
  return movies.json()
}

export const getMovieById = async (id: string): Promise<Movie> => {
  const url = `${baseUrl}/movie?i=${id}`
  const movie = await fetch(url)
  return movie.json()
}

export const getReviewByMovieName = async (movieName: string): Promise<Review> => {
  const url = `${baseUrl}/review?r=${movieName}`
  const review = await fetch(url)
  return review.json()
}