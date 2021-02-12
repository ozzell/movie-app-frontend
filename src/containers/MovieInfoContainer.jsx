import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getMovieById} from '../services/movies'
import {setCurrentMovie} from '../reducers/moviesReducer'

const MovieInfoContainer = props => {
  const dispatch = useDispatch()
  const {id} = useParams()
  const currentMovie = useSelector(state => state.currentMovie)

  const[loading, setLoading] = useState(true) 

  useEffect(() => {
    const doGetMovie = async () => {
      const response = await getMovieById(id)
      dispatch(setCurrentMovie(response))
      setLoading(false)
    }
    loading && doGetMovie()
  }, [dispatch, id, loading])

  if (loading) {
    return <div>Loading</div>
  }
  return (
    <div className="movie-info-container">
      <h1>{currentMovie.Title}</h1>
      <p>{currentMovie.Year}</p>
      <p>{currentMovie.Plot}</p>
      <h2>New York Times Review</h2>
      <p>{currentMovie.NytReview?.headline}</p>
      <p>{currentMovie.NytReview?.summary}</p>
    </div>
  )
}

export default MovieInfoContainer