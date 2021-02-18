import {ThunkAction} from 'redux-thunk'
import {Action} from 'redux'

export const INIT_SEARCH_RESULT = 'INIT_SEARCH_RESULT'
export const SET_SEARCH_TERM = 'SET_SEARCH_TERM'
export const SET_LOADING = 'SET_LOADING'
export const SET_CURRENT_MOVIE = 'SET_CURRENT_MOVIE'
export const SET_CURRENT_REVIEW = 'SET_CURRENT_REVIEW'

type Ratings = {
  Source: string
  Value: string
}

export type SearchMovie = {
  Title: string
  Year: string
  imdbID: string
  Poster: string
}

export type ApiMovies = {
  Search?: SearchMovies
  error?: string
}

export type SearchMovies = SearchMovie[] | undefined

export type Movie = {
  error?: string
  Actors?: string
  Director?: string
  Genre?: string
  Plot?: string
  Ratings?: Ratings[]
  Title: string
  Writer?: string
  Year?: string
  imdbID: string
}

export type Review = {
  display_title?: string
  headline?: string
  summary?: string
}

export type MoviesState = {
  searchResult: SearchMovies
  searchTerm: string
  loading: boolean
  currentMovie: Movie
  currentMovieReview: Review
  error: string
}

export type InitSearchResultAction = {
  type: typeof INIT_SEARCH_RESULT
  payload: ApiMovies
}

export type SetSearchTermAction = {
  type: typeof SET_SEARCH_TERM
  payload: string
}

export type SetLoadingAction = {
  type: typeof SET_LOADING
  payload: boolean
}

export type SetCurrentMovieAction = {
  type: typeof SET_CURRENT_MOVIE
  payload: Movie
}

export type SetCurrentReviewAction = {
  type: typeof SET_CURRENT_REVIEW
  payload: Review
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  MoviesState,
  unknown,
  Action<string>
>

export type MoviesActionTypes = 
  InitSearchResultAction |
  SetSearchTermAction |
  SetLoadingAction |
  SetCurrentMovieAction |
  SetCurrentReviewAction