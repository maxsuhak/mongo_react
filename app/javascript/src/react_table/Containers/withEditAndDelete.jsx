/*
  Injects a column of type onto the end of a react table with edit and delete links.
  Expects a react table state with an table.items key, as well as data items that adhere
  to a data format of:
  [
    links: {
      edit: {}
      delete: {}
    }
  ]

  Accepts an argument of editDeleteCell which is expected to be a React Table cell that
  can accept edit and delete handler params.

  Additionally, when no records are present with the edit and delete keys listed above,
  the column is hidden. */

import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { invalidateTableData } from '../actions'
import { EditDeleteCell } from '../Components'
import { hiddenColumnClass } from '../helpers'

import '../with_edit_and_delete.scss'

/*
  Returns true if a given record has a value for either
  links: {
    edit: {}
    delete: {}
  }
*/
function editOrDeletePresent (record) {
  if (!record.links) { return false }

  return record.links.edit || record.links.delete
}

/*
  Returns true iff at least one record exists for which either an edit or delete link is present.
*/
function recordWithEditOrDeleteExists (records) {
  return records && records.filter((record) => editOrDeletePresent(record)).length > 0
}

const withEditAndDelete = (WrappedComponent, editDeleteCell = EditDeleteCell) => {
  function buildCell (showEditAndDelete, editHandler, deleteHandler) {
    return [
      {
        Cell: editDeleteCell(editHandler, deleteHandler),
        sortable: false,
        filterable: false,
        maxWidth: 50,
        getHeaderProps: () => {
          return showEditAndDelete ? {} : hiddenColumnClass
        },
        getProps: () => {
          return showEditAndDelete ? {} : hiddenColumnClass
        }
      }
    ]
  }

  const mapStateToProps = (state) => {
    return {
      showEditAndDelete: recordWithEditOrDeleteExists(state.table.items)
    }
  }

  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      invalidateTableData: () => {
        dispatch(invalidateTableData())
      }
    }
  }

  class TableWithEditAndDelete extends React.Component {
    editHandler = (id) => {
      const editFunction = this.props.editHandler

      return editFunction && function () {
        return editFunction(id)
      }
    }

    deleteHandler = (id) => {
      const { invalidateTableData } = this.props
      const deleteFunction = this.props.deleteHandler

      return function () {
        return deleteFunction(id).then((response) => {
          invalidateTableData()
        })
      }
    }

    buildEditDeleteCell = () => {
      const { showEditAndDelete, editHandler } = this.props

      return buildCell(showEditAndDelete, editHandler && this.editHandler, this.deleteHandler)
    }

    render () {
      const { showEditAndDelete, invalidateTableData, ...props } = this.props

      return <WrappedComponent
        {...props}
        tableHeaders={this.props.tableHeaders.concat(this.buildEditDeleteCell())} />
    }
  }

  TableWithEditAndDelete.propTypes = {
    tableHeaders: PropTypes.array.isRequired,
    deleteHandler: PropTypes.func.isRequired,
    editHandler: PropTypes.func
  }

  return connect(mapStateToProps, mapDispatchToProps)(TableWithEditAndDelete)
}

export default withEditAndDelete
