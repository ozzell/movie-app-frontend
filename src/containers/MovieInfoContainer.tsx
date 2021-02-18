import {useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {setCurrentMovie, setCurrentReview} from '../reducers/moviesReducer'
import {MoviesState} from '../reducers/types'
import MovieInfo from '../components/MovieInfo'
import MovieReview from '../components/MovieReview'
import SearchForm from '../components/SearchForm'

const MovieInfoContainer = (): JSX.Element => {
  const dispatch = useDispatch()
  const {id} = useParams<{id: string}>()

  const currentMovie = useSelector((state: MoviesState) => state.currentMovie)
  const currentReview = useSelector((state: MoviesState) => state.currentMovieReview)
  const error = useSelector((state: MoviesState) => state.error)
  const searchTerm = useSelector((state: MoviesState) => state.searchTerm)
  const loading = useSelector((state: MoviesState) => state.loading)

  const movieIdsMatch = currentMovie.imdbID === id
  const movieAndReviewTitlesMatch = currentMovie.Title === currentReview.display_title

  useEffect(() => {
    if (movieIdsMatch) {
      return
    }
    dispatch(setCurrentMovie(id))
  }, [dispatch, id, currentMovie.imdbID])

  useEffect(() => {
    if (movieAndReviewTitlesMatch) {
      return
    }
    currentMovie.Title && dispatch(setCurrentReview(currentMovie.Title))
  }, [dispatch, currentMovie.Title, currentReview.display_title])

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="movie-info-container">
      <SearchForm
        searchTerm={searchTerm}
        loading={loading}
      />
      {movieIdsMatch && <MovieInfo currentMovie={currentMovie} />}
      {movieAndReviewTitlesMatch && <MovieReview currentReview={currentReview} />}
    </div>
  )
}

export default MovieInfoContainer