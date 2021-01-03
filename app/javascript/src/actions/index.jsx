export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const RESET_CURRENT_USER = 'RESET_CURRENT_USER'
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY'
export const RESET_SEARCH_QUERY = 'RESET_SEARCH_QUERY'

export const setCurrentUser = (payload) => ({
  type: SET_CURRENT_USER,
  payload: payload
})

export const resetCurrentUser = () => ({
  type: RESET_CURRENT_USER
})

export const setSearchQuery = (payload) => ({
  type: SET_SEARCH_QUERY,
  payload: payload
})

export const resetSearchQuery = () => ({
  type: SET_SEARCH_QUERY
})
