import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import SearchForm from '../components/SearchForm'
import {getMoviesByName} from '../services/movies'
import {initSearchResult, setSearchTerm, setLoading} from '../reducers/moviesReducer'

const MovieSearchContainer = () => {
  const dispatch = useDispatch()
  const searchResult = useSelector(state => state.searchResult)
  const searchTerm = useSelector(state => state.searchTerm)
  const loading = useSelector(state => state.loading)

  useEffect(() => {
    const doGetMovies = async () => {
      const response = await getMoviesByName(searchTerm)
      dispatch(initSearchResult(response?.Search))
      dispatch(setLoading(false))
    }
    loading && doGetMovies()
  }, [loading, searchTerm, dispatch])

  const handleSearchButtonClicked = async event => {
    event.preventDefault()
    dispatch(setLoading(true))
  }

const handleOnInput = event => {
  dispatch(setSearchTerm(event.target.value))
}

  return (
    <>
      <SearchForm 
        handleSearchButtonClicked={handleSearchButtonClicked}
        handleOnInput={handleOnInput}
        searchTerm={searchTerm}
      />
      <ul>
        {searchResult
          ? searchResult.map(item => (
            <li key={item.imdbID}><img src={item.Poster} alt={`A poster for ${item.Title}`} />{item.Title}</li>
          ))
          : <span>No movies found</span>
        }
      </ul>
    </> 
  )
}

export default MovieSearchContainer