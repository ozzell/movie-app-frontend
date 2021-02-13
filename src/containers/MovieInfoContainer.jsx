import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getMovieById, getReviewByMovieName} from '../services/movies'
import {setCurrentMovie, setCurrentReview} from '../reducers/moviesReducer'

const MovieInfoContainer = props => {
  const dispatch = useDispatch()
  const {id} = useParams()
  const currentMovie = useSelector(state => state.currentMovie)
  const currentReview = useSelector(state => state.currentMovieReview)

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

  return (
    <div className="movie-info-container">
      {!loading &&
        <>
          <h1>{currentMovie.Title}</h1>
          <p>{currentMovie.Year}</p>
          <p>{currentMovie.Plot}</p>
          <h2>New York Times Review</h2>
        </>
      }
      {!loadingReview &&
      <div>
        <p>{currentReview?.headline}</p>
        <p>{currentReview?.summary}</p>
      </div>
      }
    </div>
  )
}

export default MovieInfoContainer