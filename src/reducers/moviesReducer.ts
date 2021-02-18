import {
  INIT_SEARCH_RESULT,
  SET_SEARCH_TERM,
  SET_LOADING,
  SET_CURRENT_MOVIE,
  SET_CURRENT_REVIEW,
  MoviesState,
  MoviesActionTypes,
  SetSearchTermAction,
  SetLoadingAction,
  AppThunk
} from './types'
import {getMoviesByName, getMovieById, getReviewByMovieName} from '../services/movies'

const initialState: MoviesState = {
  searchResult: [],
  searchTerm: '',
  loading: false,
  currentMovie: {Title: '', imdbID: ''},
  currentMovieReview: {},
  error: ''
}

const moviesReducer = (state = initialState, action: MoviesActionTypes): MoviesState => {
  switch (action.type) {
    case INIT_SEARCH_RESULT:
      if (action.payload.error) {
        return {...state, error: action.payload.error}
      }
      return {...state, searchResult: action.payload?.Search, error: ''}
    case SET_SEARCH_TERM:
      return {...state, searchTerm: action.payload}
    case SET_LOADING:
      return {...state, loading: action.payload}
    case SET_CURRENT_MOVIE:
      if (action.payload.error) {
        return {...state, error: action.payload.error}
      }
      return {...state, currentMovie: action.payload, error: ''}
    case SET_CURRENT_REVIEW:
      return {...state, currentMovieReview: action.payload}
    default:
      return state
  }
}

export const initSearchResult = (searchTerm: string): AppThunk  => {
  return async dispatch => {
    const response = await getMoviesByName(searchTerm)
    dispatch({
      type: INIT_SEARCH_RESULT,
      payload: response
    })
    dispatch(setLoading(false))
  }
}

export const setSearchTerm = (search: string): SetSearchTermAction => {
  return {
    type: SET_SEARCH_TERM,
    payload: search
  }
}

export const setLoading = (trueOrFalse: boolean): SetLoadingAction => {
  return {
    type: SET_LOADING,
    payload: trueOrFalse
  }
}

export const setCurrentMovie = (id: string): AppThunk => {
  return async dispatch => {
    const response = await getMovieById(id)
    dispatch({
      type: SET_CURRENT_MOVIE,
      payload: response
    })
  }
}

export const setCurrentReview = (title: string): AppThunk => {
  return async dispatch => {
    const response = await getReviewByMovieName(title)
    dispatch({
      type: SET_CURRENT_REVIEW,
      payload: response
    })
  }
}

export default moviesReducer