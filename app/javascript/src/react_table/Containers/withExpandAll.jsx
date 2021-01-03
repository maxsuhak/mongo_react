/* Injects an expand/collapse all button into the first row
   of a react table */
import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { buildExpandedState, injectedIndexCell } from '../helpers'
import { Expander } from '../Components'

const mapStateToProps = (state) => {
  return {
    dataSize: state.table.items ? new Set(state.table.items.map((record) => record['index'])).size : 0
  }
}

function injectIndexCell (props, headers) {
  return [injectedIndexCell(props, Expander)].concat(headers)
}

const withExpandAll = (WrappedComponent) => {
  class TableWithExpandAll extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        allExpanded: false,
        expanded: {}
      }
    }

    handlePageChange = (pageIndex) => {
      this.props.onPageChange && this.props.onPageChange(pageIndex)

      this.setState({
        allExpanded: false,
        expanded: {}
      })
    }

    handleAllExpandedChange = () => {
      const newState = !this.state.allExpanded

      this.setState({
        allExpanded: newState,
        expanded: buildExpandedState(this.props.dataSize, newState)
      })
    }

    handleExpandedChange = (expanded) => {
      this.props.onExpandedChange && this.props.onExpandedChange(expanded)

      this.setState({ expanded })
    }

    render () {
      return <WrappedComponent
        {...this.props}
        {...this.state}
        onExpandedChange={this.handleExpandedChange}
        onPageChange={this.handlePageChange}
        tableHeaders={injectIndexCell({
          allExpanded: this.state.allExpanded,
          onAllExpandedChange: this.handleAllExpandedChange
        }, this.props.tableHeaders)} />
    }
  }

  TableWithExpandAll.propTypes = {
    tableHeaders: PropTypes.array.isRequired
  }

  return connect(mapStateToProps, null)(TableWithExpandAll)
}

export default withExpandAll
