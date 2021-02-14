import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getMovieById, getReviewByMovieName} from '../services/movies'
import {setCurrentMovie, setCurrentReview} from '../reducers/moviesReducer'
import {MoviesState} from '../reducers/types'
import MovieInfo from '../components/MovieInfo'
import MovieReview from '../components/MovieReview'

const MovieInfoContainer = (): JSX.Element => {
  const dispatch = useDispatch()
  const {id} = useParams<{id: string}>()
  const currentMovie = useSelector((state: MoviesState) => state.currentMovie)
  const currentReview = useSelector((state: MoviesState) => state.currentMovieReview)
  const error = useSelector((state: MoviesState) => state.error)

  const[loading, setLoading] = useState(true)
  const[loadingReview, setLoadingReview] = useState(true) 

  useEffect(() => {
    let isCancelled = false

    const doGetMovie = async () => {
      const response = await getMovieById(id)
      if (isCancelled) {
        return
      }
      dispatch(setCurrentMovie(response))
      setLoading(false)
    }
    if (currentMovie.imdbID === id) {
      setLoading(false)
    }

    loading && doGetMovie()
    return () => {
      isCancelled = true
    }
  }, [dispatch, setLoading, id, loading, currentMovie])

  useEffect(() => {
    let isCancelled = false
    const doGetReview = async () => {
      if (currentReview.display_title === currentMovie.Title) {
        setLoadingReview(false)
        return
      }
      const response = await getReviewByMovieName(currentMovie.Title)
      if (isCancelled) {
        return
      }
      dispatch(setCurrentReview(response))
      setLoadingReview(false)
    }
    !loading && currentMovie.Title && loadingReview && doGetReview()
    return () => {
      isCancelled = true
    }
  }, [dispatch, currentMovie, loadingReview, currentReview, loading])

  if (error) {
    return <div>{error}</div>
  }
  return (
    <div className="movie-info-container">
      {!loading && currentMovie.Title && <MovieInfo currentMovie={currentMovie} />}
      {!loadingReview && <MovieReview currentReview={currentReview} />}
    </div>
  )
}

export default MovieInfoContainer