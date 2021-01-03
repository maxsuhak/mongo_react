import {
  REQUEST_TABLE_DATA,
  RECEIVE_TABLE_DATA,
  INVALIDATE_TABLE_DATA,
  UPDATE_TABLE_DATA
} from '../actions'

export const initialState = {
  items: null,
  isFetching: false,
  lastUpdated: null,
  errors: null,
  didInvalidate: false,
  updateTableData: false
}

const buildTableReducer = () => {
  return function (state = initialState, action) {
    switch (action.type) {
      case REQUEST_TABLE_DATA:
        return {
          ...state,
          isFetching: true,
          didInvalidate: false,
          updateTableData: false
        }
      case RECEIVE_TABLE_DATA:
        return {
          ...state,
          items: action.data.collection,
          pages: action.data.pages,
          isFetching: false,
          lastUpdated: new Date()
        }
      case INVALIDATE_TABLE_DATA:
        return {
          ...state,
          didInvalidate: true
        }
      case UPDATE_TABLE_DATA:
        return {
          ...state,
          updateTableData: true
        }
      default:
        return state
    }
  }
}

export default buildTableReducer
