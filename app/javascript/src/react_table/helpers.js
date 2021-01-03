import React from 'react'
import { requestTableData, receiveTableData } from './actions'

export const DEFAULT_PAGE_SIZE = 50

export const hiddenColumnClass = {
  className: 'flex-zero'
}

/*
  Transform passed value to a comma-separated number with two decimal places
  represented as a string
*/
export function currencyValue (value = 0) {
  if (value === '-') {
    return value
  }

  let valueToNumber = Math.floor((100 * value).toFixed(2)) / 100

  return valueToNumber.toLocaleString(undefined, { minimumFractionDigits: 2 })
}

// Returns currencyValue with $
export const formatValue = (value) => {
  return '$' + currencyValue(value)
}

export function commaSeparatedValue (value) {
  value *= 1.0
  return value.toLocaleString(undefined, { minimumFractionDigits: 0 })
}

export const buildExpandedState = (size, state) => {
  if (state === false) { return {} }
  let expandedState = {}

  for (let i = 0; i < size; i++) {
    expandedState[i] = true
  }

  return expandedState
}

export const injectedIndexCell = (props, ExpanderComponent) => {
  return {
    Header: () => (
      <ExpanderComponent {...props} />
    ),
    PivotValue: ({ value }) => (
      <span />
    ),
    accessor: 'index',
    maxWidth: 30,
    resizable: false
  }
}

export const defaultMapDispatchToProps = (dispatch) => (
  {
    requestTableData: () => {
      dispatch(requestTableData())
    },
    receiveTableData: (data) => {
      console.log(data)
      dispatch(receiveTableData(data))
    }
  }
)

export const defaultMapStateToProps = (state) => (
  {
    data: state.table.items,
    isFetching: state.table.isFetching,
    pages: state.table.pages,
    didInvalidate: state.table.didInvalidate,
    updateTableData: state.table.updateTableData
  }
)
