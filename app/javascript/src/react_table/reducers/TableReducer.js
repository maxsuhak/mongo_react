import { combineReducers } from 'redux'
import { default as buildTableReducer } from '.'

export default combineReducers({
  table: buildTableReducer()
})

export { initialState } from '.'
