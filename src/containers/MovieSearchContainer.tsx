import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useLocation, useHistory} from 'react-router-dom'
import SearchForm from '../components/SearchForm'
import SearchResults from '../components/SearchResults'
import {initSearchResult, setSearchTerm, setLoading} from '../reducers/moviesReducer'
import {MoviesState} from '../reducers/types'

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const MovieSearchContainer = (): JSX.Element => {
  const dispatch = useDispatch()
  const searchResult = useSelector((state: MoviesState) => state.searchResult)
  const searchTerm = useSelector((state: MoviesState) => state.searchTerm)
  const loading = useSelector((state: MoviesState) => state.loading)
  const error = useSelector((state: MoviesState) => state.error)

  const query = useQuery()
  const history = useHistory()

  useEffect(() => {
    const searchQuery = query.get('q')
    if (searchQuery && searchQuery !== searchTerm) {
      dispatch(setSearchTerm(searchQuery))
      dispatch(setLoading(true))
    }
  }, [history.location.search])

  useEffect(() => {
    if (loading) {
      dispatch(initSearchResult(searchTerm))
      dispatch(setLoading(false))
    }
  }, [loading, searchTerm, dispatch])

  return (
    <div className="movie-search-container">
      <SearchForm
        searchTerm={searchTerm}
        loading={loading}
      />
      {loading
        ? <div>Loading</div>
        : <SearchResults
          searchResult={searchResult}
          error={error}
          />
}
    </div> 
  )
}

export default MovieSearchContainer