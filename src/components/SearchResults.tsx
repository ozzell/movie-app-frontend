import {Link} from 'react-router-dom'
import {SearchMovies} from '../reducers/types'

type SearchResultsProps = {
  searchResult: SearchMovies
  error: string
}

const SearchResults = ({searchResult, error}: SearchResultsProps): JSX.Element => {
  if (error) {
    return <div>{error}</div>
  }
  return (
    <ul className="search-results">
        {searchResult?.map(item => (
          <li key={item.imdbID}>
            <Link to={`/movies/${item.imdbID}`}>
              <img src={item.Poster} alt={`A poster for ${item.Title}`} />
              {item.Title} ({item.Year})
            </Link>
          </li>
          ))
        }
      </ul>
  )
}

export default SearchResults