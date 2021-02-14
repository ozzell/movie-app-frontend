import {Link} from 'react-router-dom'
import {SearchMovies} from '../reducers/types'

type SearchResultsProps = {
  searchResult: SearchMovies
}

const SearchResults = ({searchResult}: SearchResultsProps): JSX.Element => {
  return (
    <ul className="search-results">
        {searchResult
          ? searchResult.map(item => (
            <li key={item.imdbID}>
              <Link to={`/movie/${item.imdbID}`}>
                <img src={item.Poster} alt={`A poster for ${item.Title}`} />
                {item.Title} ({item.Year})
              </Link>
            </li>
          ))
          : <span>No movies found</span>
        }
      </ul>
  )
}

export default SearchResults