import React from 'react'
import ReactTable from 'react-table'
import PropTypes from 'prop-types'

import { DEFAULT_PAGE_SIZE } from '../helpers'

import 'react-table/react-table.css'
import '../styles.scss'

function calculateMinRows (data) {
  if (data === null) { return }

  let aggregatedLength = new Set(data.map((record) => record['index'])).size
  return aggregatedLength > DEFAULT_PAGE_SIZE ? DEFAULT_PAGE_SIZE : aggregatedLength
}

const CollapsableTable = (props) => {
  const {
    isFetching,
    handlePageChange,
    pages,
    pageSize,
    fetchData,
    data,
    tableHeaders,
    tableType,
    ...otherProps
  } = props

  const minRows = calculateMinRows(data)
  const showPagination = pages > 1

  return (
    <ReactTable
      manual
      columns={tableHeaders}
      pages={pages}
      defaultPageSize={pageSize || DEFAULT_PAGE_SIZE}
      onFetchData={fetchData}
      showPagination={showPagination}
      loading={isFetching}
      pivotBy={['index']}
      minRows={minRows}
      sortable={false}
      showPageSizeOptions={false}
      className='-striped -highlight'
      data={data || []}
      {...otherProps}
    />
  )
}

CollapsableTable.propTypes = {
  fetchData: PropTypes.func,
  tableHeaders: PropTypes.array.isRequired,
  data: PropTypes.array,
  isFetching: PropTypes.bool,
  pages: PropTypes.number.isRequired,
  pageSize: PropTypes.number
}

CollapsableTable.defaultProps = {
  data: [],
  pages: 1
}
export default CollapsableTable
