import React from 'react'
import { connect } from 'react-redux'
import { searchUsers, deleteUser } from '../../services/userService'
import { setCurrentUser, resetCurrentUser, resetSearchQuery } from '../../actions'
import { Link } from 'react-router-dom'
import IndexTable from '../../react_table/Components/IndexTable'
import withReadOnlyTable from '../../react_table/Containers/withReadOnlyTable'
import withNoRecordsFound from '../../react_table/Components/withNoRecordsFound'
import { withHiddenLoader } from '../loader'
import ConfirmationModal from '../ConfirmModal'
import { withRouter } from 'react-router-dom'
import queryString from 'query-string'

const IndexTableWithLoader = withHiddenLoader(withNoRecordsFound(IndexTable))
const ConnectedComponent = withReadOnlyTable(IndexTableWithLoader)

export const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (data) => {
      dispatch(setCurrentUser(data))
    },
    resetCurrentUser: () => {
      dispatch(resetCurrentUser())
    },
    resetSearchQuery: () => {
      dispatch(resetSearchQuery())
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
    searchQuery: state.user.searchQuery
  }
}

class Search extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchQuery: ''
    }
  }

  componentDidMount () {
    this.setState({searchQuery: queryString.parse(this.props.location.search)['q']})
    this.props.resetCurrentUser()
  }

  componentWillReceiveProps (nextProps) {
    if( nextProps.searchQuery !== this.props.searchQuery ) {
      this.setState({searchQuery: nextProps.searchQuery})
    }
  }

  async handleConfirm (id) {
    await deleteUser(id, this.handleSuccess)
  }

  handleSuccess = () => {
    this.props.resetCurrentUser()

    const pathname = this.props.location.pathname
    const search = this.props.location.search

    this.props.history.replace('/reload')

    this.props.history.replace({
      pathname: pathname,
      search: search
    })
  }

  handleCancel = () => {
    this.props.resetCurrentUser()
  }

  tableHeaders = [
    {
      Header: 'Email',
      accessor: 'email'
    },
    {
      Header: 'First Name',
      accessor: 'first_name'
    },
    {
      Header: 'Last Name',
      accessor: 'last_name'
    },
    {
      Header: 'Action',
      accessor: '_id',
      filterable: false,
      Cell: (props) => {
        return (
          <div className='text-center'>
            <Link to={`/user/${props.original._id['$oid']}`}>
              <i className='fas fa-eye' />
            </Link>
            &nbsp;
            <Link to={`/user/${props.original._id['$oid']}/edit`}>
              <i className='fas fa-edit' />
            </Link>
            &nbsp;
            <i className='fa fa-trash fa-fw' onClick={() => this.props.setCurrentUser(props.original)} />
          </div>
        )
      }
    }
  ]

  defaultSorted = [{ id: 'email', desc: true }]

  render() {
    const { user } = this.props

    return (
      <React.Fragment>
        <h1>Search {this.state.searchQuery}</h1>

        <ConnectedComponent
          key={this.state.searchQuery}
          tableHeaders={this.tableHeaders}
          dataSource={searchUsers}
          defaultSorted={this.defaultSorted}
          pageSize={10}
          noRecordsOnlyOnInitial
          filterable
          query={this.state.searchQuery}
          minRows={5} />

        { user && user._id && user._id['$oid'] &&
          <ConfirmationModal
            title={`Delete User ${user._id['$oid']}`}
            show={!!user._id['$oid']}
            handleConfirm={() => this.handleConfirm(user._id['$oid'])}
            handleCancel={this.handleCancel}>
            <div>
              Are you sure you wish to continue?
            </div>
          </ConfirmationModal>
        }
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Search))
