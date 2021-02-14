import {useEffect, ChangeEvent, FormEvent} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import SearchForm from '../components/SearchForm'
import SearchResults from '../components/SearchResults'
import {getMoviesByName} from '../services/movies'
import {initSearchResult, setSearchTerm, setLoading} from '../reducers/moviesReducer'
import {MoviesState} from '../reducers/types'

const MovieSearchContainer = (): JSX.Element => {
  const dispatch = useDispatch()
  const searchResult = useSelector((state: MoviesState) => state.searchResult)
  const searchTerm = useSelector((state: MoviesState) => state.searchTerm)
  const loading = useSelector((state: MoviesState) => state.loading)
  const error = useSelector((state: MoviesState) => state.error)

  useEffect(() => {
    const doGetMovies = async () => {
      const response = await getMoviesByName(searchTerm)
      dispatch(initSearchResult(response))
      dispatch(setLoading(false))
      dispatch(setSearchTerm(''))
    }
    loading && doGetMovies()
  }, [loading, searchTerm, dispatch])

  const handleSearchButtonClicked = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!searchTerm) {
      return
    }
    dispatch(setLoading(true))
  }

const handleOnInput = (event: ChangeEvent<HTMLInputElement>) => {
  dispatch(setSearchTerm(event.target.value))
}

  return (
    <div className="movie-search-container">
      <SearchForm 
        handleSearchButtonClicked={handleSearchButtonClicked}
        handleOnInput={handleOnInput}
        searchTerm={searchTerm}
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