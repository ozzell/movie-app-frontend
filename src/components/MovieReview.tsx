import {Review} from '../reducers/types'

type MovieReviewProps = {
  currentReview: Review
}

const MovieReview = ({currentReview}: MovieReviewProps): JSX.Element => {
  return (
    <div>
      <h2>New York Times Review</h2>
      <p>{currentReview?.headline}</p>
      <p>{currentReview?.summary}</p>
    </div>
  )
}

export default MovieReview