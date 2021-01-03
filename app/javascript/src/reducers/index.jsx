import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form'
import userReducer from './userReducer'
import buildTableReducer from '../react_table/reducers'

export { initialState } from './userReducer'
export { initialState as reactTableInitialState } from '../react_table/reducers'

export default combineReducers({
  user: userReducer,
  form: formReducer,
  table: buildTableReducer()
})
