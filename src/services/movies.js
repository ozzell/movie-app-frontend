const baseUrl = 'http://localhost:3001'

export const getMoviesByName = async movieName => {
  const url = `${baseUrl}/search-movies?s=${movieName}`
  const movies = await fetch(url)
  return movies.json()
}