import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getMovieById, getReviewByMovieName} from '../services/movies'
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
  const[loadingReview, setLoadingReview] = useState(true) 

  // For useEffect cleanup
  let isUnmounted = false

  useEffect(() => {
    const doGetMovie = async () => {
      const response = await getMovieById(id)
      if (isUnmounted) {
        return
      }
      dispatch(setCurrentMovie(response))
      setLoadingMovie(false)
    }
    if (currentMovie.imdbID === id) {
      setLoadingMovie(false)
    }

    loadingMovie && doGetMovie()
    return () => {
      isUnmounted = true
    }
  }, [dispatch, setLoadingMovie, id, loadingMovie, currentMovie])

  useEffect(() => {
    const doGetReview = async () => {
      if (currentReview.display_title === currentMovie.Title) {
        setLoadingReview(false)
        return
      }
      const response = await getReviewByMovieName(currentMovie.Title)
      if (isUnmounted) {
        return
      }
      dispatch(setCurrentReview(response))
      setLoadingReview(false)
    }
    !loadingMovie && currentMovie.Title && loadingReview && doGetReview()
    return () => {
      isUnmounted = true
    }
  }, [dispatch, currentMovie, loadingReview, currentReview, loadingMovie])

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
      {!loadingReview && <MovieReview currentReview={currentReview} />}
    </div>
  )
}

export default MovieInfoContainer