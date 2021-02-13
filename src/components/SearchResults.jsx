import {Link} from 'react-router-dom'

const SearchResults = ({searchResult}) => {
  return (
    <ul className="search-results">
        {searchResult
          ? searchResult.map(item => (
            <li key={item.imdbID}>
              <Link to={`/movie/${item.imdbID}`}>
                <img src={item.Poster} alt={`A poster for ${item.Title}`} />
                {item.Title}
              </Link>
            </li>
          ))
          : <span>No movies found</span>
        }
      </ul>
  )
}

export default SearchResults