const baseUrl = 'http://localhost:3001'

export const getMoviesByName = async movieName => {
  const url = `${baseUrl}/search-movies?s=${movieName}`
  const movies = await fetch(url)
  return movies.json()
}

export const getMovieById = async id => {
  const url = `${baseUrl}/movie?i=${id}`
  const movie = await fetch(url)
  return movie.json()
}