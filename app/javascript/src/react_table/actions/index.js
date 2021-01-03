export const REQUEST_TABLE_DATA = 'REQUEST_TABLE_DATA'
export const RECEIVE_TABLE_DATA = 'RECEIVE_TABLE_DATA'
export const INVALIDATE_TABLE_DATA = 'INVALIDATE_TABLE_DATA'
export const UPDATE_TABLE_DATA = 'UPDATE_TABLE_DATA'

export const requestTableData = () => ({
  type: REQUEST_TABLE_DATA
})

export const receiveTableData = (data) => ({
  type: RECEIVE_TABLE_DATA,
  data: data
})

export const invalidateTableData = () => ({
  type: INVALIDATE_TABLE_DATA
})

export const updateTableData = () => ({
  type: UPDATE_TABLE_DATA
})
