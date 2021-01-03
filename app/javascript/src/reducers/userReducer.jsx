import {
  SET_CURRENT_USER,
  RESET_CURRENT_USER,
  SET_SEARCH_QUERY,
  RESET_SEARCH_QUERY
} from '../actions'

export const initialState = {
  users: [],
  search: [],
  currentUser: {},
  isLoading: false,
  searchQuery: ''
}

export default function userReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      }
    case RESET_CURRENT_USER:
      return {
        ...initialState
      }

    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: payload
      }
    case RESET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: ''
      }
    default:
      return state
  }
}
