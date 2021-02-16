import {Link} from 'react-router-dom'
import {SearchMovies, SearchMovie} from '../reducers/types'

type SearchResultsProps = {
  searchResult: SearchMovies
  error: string
}

type MovieCardProps = {
  item: SearchMovie
}

const MovieCard = ({item}: MovieCardProps) => {
  return (
    <li>
      <Link to={`/movies/${item.imdbID}`}>
        <img src={item.Poster} alt={`A poster for ${item.Title}`} />
        <p className="search-movie-title">{item.Title} ({item.Year})</p>
      </Link>
    </li>
  )
}

const SearchResults = ({searchResult, error}: SearchResultsProps): JSX.Element => {
  if (error) {
    return <div>{error}</div>
  }
  return (
    <ul className="search-results">
      {searchResult?.map(item => (
        <MovieCard key={item.imdbID} item={item} />
      ))}
    </ul>
  )
}

export default SearchResults