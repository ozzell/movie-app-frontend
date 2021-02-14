import {Movie} from '../reducers/types'

type MovieInfoProps = {
  currentMovie: Movie
}

const MovieInfo = ({currentMovie}: MovieInfoProps): JSX.Element => {
  return (
    <div>
      <h1>{currentMovie.Title} ({currentMovie.Year})</h1>
      <small>
        {currentMovie.Genre}
        <ul>
          <li><b>Director:</b> {currentMovie.Director}</li>
          <li><b>Writer:</b> {currentMovie.Writer}</li>
          <li><b>Actors:</b> {currentMovie.Actors}</li>
        </ul>
      </small>
      <p>{currentMovie.Plot}</p>
      <ul>
        {currentMovie.Ratings?.map(rating => (
          <li key={rating.Value}>{rating.Value} from {rating.Source}</li>
        ))}
      </ul>
    </div>
  )
}

export default MovieInfo