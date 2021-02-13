import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import SearchForm from '../components/SearchForm'
import SearchResults from '../components/SearchResults'
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
      dispatch(setSearchTerm(''))
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
    <div className="movie-search-container">
      <SearchForm 
        handleSearchButtonClicked={handleSearchButtonClicked}
        handleOnInput={handleOnInput}
        searchTerm={searchTerm}
      />
      {!!loading
        ? <div>Loading</div>
        : <SearchResults searchResult={searchResult} />
}
    </div> 
  )
}

export default MovieSearchContainer