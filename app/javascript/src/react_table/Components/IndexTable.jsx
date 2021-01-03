/*
  Class to load a simple, paginated table.
*/

import React from 'react'
import ReactTable from 'react-table'
import PropTypes from 'prop-types'
import { DEFAULT_PAGE_SIZE } from '../helpers'

import 'react-table/react-table.css'
import '../styles.scss'

function calculateMinRows (data, pageSize) {
  if (data === null) { return }

  return data.length > pageSize ? pageSize : data.length
}

function shouldFetchData (props) {
  return props.didInvalidate || props.updateTableData
}

class IndexTable extends React.Component {
  componentDidUpdate () {
    this.fetchDataIfNeeded()
  }

  fetchDataIfNeeded () {
    if (shouldFetchData(this.props)) {
      this.props.requestTableData()
      this.refs.reactTable.fireFetchData()
    }
  }

  render () {
    let {
      isFetching,
      data,
      pages,
      pageSize,
      fetchData,
      multiSort,
      tableHeaders,
      showPagination,
      classes = '-striped -highlight',
      ...otherProps
    } = this.props

    const minRows = calculateMinRows(data, pageSize || DEFAULT_PAGE_SIZE)

    return (
      <ReactTable
        manual
        data={data || []}
        columns={tableHeaders}
        pages={pages}
        defaultPageSize={pageSize || DEFAULT_PAGE_SIZE}
        onFetchData={fetchData}
        showPagination={showPagination || pages > 1}
        loading={isFetching}
        multiSort={multiSort}
        showPageSizeOptions={false}
        className={classes}
        ref='reactTable'
        {...otherProps}
      />
    )
  }
}

IndexTable.propTypes = {
  fetchData: PropTypes.func,
  tableHeaders: PropTypes.array.isRequired,
  data: PropTypes.array,
  isFetching: PropTypes.bool,
  pages: PropTypes.number,
  pageSize: PropTypes.number,
  multiSort: PropTypes.bool
}

IndexTable.defaultProps = {
  multiSort: true
}

export default IndexTable
