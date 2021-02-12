import {Link} from 'react-router-dom'

const SearchResults = ({searchResult}) => {
  return (
    <ul>
        {searchResult
          ? searchResult.map(item => (
            <li key={item.imdbID}>
              <img src={item.Poster} alt={`A poster for ${item.Title}`} />
              <Link to={`/movie/${item.imdbID}`}>{item.Title}</Link>
            </li>
          ))
          : <span>No movies found</span>
        }
      </ul>
  )
}

export default SearchResults