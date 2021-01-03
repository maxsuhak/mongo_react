/*
   HOC to wrap basic functionality to populate a React-Table instance.
   Provides simple request, receive, and fetchData functions.
   Assumes a state with a table key.

   Accepts:
   dataSource: function, returning a promise, to call when data should be updated.
*/

import React from 'react'
import PropTypes from 'prop-types'
import { defaultMapDispatchToProps, defaultMapStateToProps } from '../helpers'
import { connect } from 'react-redux'
import { requestTableData, receiveTableData } from '../actions'
import { debounce } from 'lodash'

const withReadOnlyTable = (WrappedComponent) => {
  const mapStateToProps = (state) => (
    defaultMapStateToProps(state)
  )

  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      ...defaultMapDispatchToProps(dispatch),
      fetchData: debounce((state, instance) => {
        // React table starts pagination at 0
        const page = state.page ? state.page + 1 : 1
        dispatch(requestTableData())

        ownProps.dataSource({
          pageSize: state.pageSize,
          page: page,
          sorted: state.sorted,
          filtered: state.filtered,
          q: state.query
        }).then((data) => {
          dispatch(receiveTableData(data))
        })
      }, 500)
    }
  }

  class ReadOnlyTableContainer extends React.Component {
    render () {
      return (
        <WrappedComponent {...this.props} />
      )
    }
  }

  ReadOnlyTableContainer.propTypes = {
    dataSource: PropTypes.func.isRequired
  }

  return connect(mapStateToProps, mapDispatchToProps)(ReadOnlyTableContainer)
}

export default withReadOnlyTable
