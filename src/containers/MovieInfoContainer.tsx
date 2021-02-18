import {useEffect, useState} from 'react'
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

  const[loadingMovie, setLoadingMovie] = useState(true)
  const[loadingReview, setLoadingReview] = useState(false) 

  useEffect(() => {
    if (currentMovie.imdbID === id) {
      setLoadingMovie(false)
      setLoadingReview(true)
      return
    }

    if (loadingMovie) {
      dispatch(setCurrentMovie(id))
      setLoadingMovie(false)
    }
  }, [dispatch, setLoadingMovie, id, loadingMovie, currentMovie])

  useEffect(() => {
    if (currentMovie.Title && loadingReview) {
      if (currentReview.display_title === currentMovie.Title) {
        setLoadingReview(false)
        return
      }
      dispatch(setCurrentReview(currentMovie.Title))
      setLoadingReview(false)
    }
  }, [dispatch, currentMovie, loadingReview, currentReview])

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="movie-info-container">
      <SearchForm
        searchTerm={searchTerm}
        loading={loading}
      />
      {!loadingMovie && currentMovie.Title && <MovieInfo currentMovie={currentMovie} />}
      {!loadingMovie && !loadingReview && <MovieReview currentReview={currentReview} />}
    </div>
  )
}

export default MovieInfoContainer