const initialState = {
  searchResult: [],
  searchTerm: '',
  loading: false,
  currentMovie: {}
}

const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_SEARCH_RESULT':
      return {...state, searchResult: action.payload}
    case 'SET_SEARCH_TERM':
      return {...state, searchTerm: action.payload}
    case 'SET_LOADING':
      return {...state, loading: action.payload}
    case 'SET_CURRENT_MOVIE':
      return {...state, currentMovie: action.payload}
    default:
      return state
  }
}

export const initSearchResult = result => {
  return {
    type: 'INIT_SEARCH_RESULT',
    payload: result
  }
}

export const setLoading = trueOrFalse => {
  return {
    type: 'SET_LOADING',
    payload: trueOrFalse
  }
}

export const setSearchTerm = search => {
  return {
    type: 'SET_SEARCH_TERM',
    payload: search
  }
}

export const setCurrentMovie = movie => {
  return {
    type: 'SET_CURRENT_MOVIE',
    payload: movie
  }
}

export default moviesReducer