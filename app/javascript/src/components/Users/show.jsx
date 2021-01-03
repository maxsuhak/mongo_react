import React from 'react'
import { connect } from 'react-redux'
import { fetchUser, deleteUser } from '../../services/userService'
import { setCurrentUser, resetCurrentUser } from '../../actions'
import { Link } from 'react-router-dom'
import ConfirmationModal from '../ConfirmModal'

export const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (id) => {
      fetchUser(id).then((data) => {
        dispatch(setCurrentUser(data))
      })
    },
    resetCurrentUser: () => {
      dispatch(resetCurrentUser())
    }
  }
}

class Show extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false
    }
  }

  componentDidMount () {
    const { id } = this.props.match.params
    this.props.fetchUser(id)
  }

  async handleConfirm (id) {
    await deleteUser(id, this.handleSuccess)
  }

  handleSuccess = (data) => {
    this.props.resetCurrentUser()
    this.props.history.push('/')
  }

  handleCancel = () => {
    this.setState({ showModal: false })
  }

  showDeleteModal = () => {
    this.setState({ showModal: true })
  }

  render() {
    const { id } = this.props.match.params
    const { first_name, last_name, email } = this.props.user

    return (
      <React.Fragment>
        <h1>
          Show User
          &nbsp;
          <Link to={`/user/${id}/edit`}>
            <i className='fas fa-edit' />
          </Link>
          &nbsp;
          <a onClick={this.showDeleteModal}><i className='fas fa-trash' /></a>
        </h1>
        First Name => {first_name} <br />
        Last Name => {last_name} <br />
        Email => {email} <br />

        <ConfirmationModal
          title={`Delete User ${id}`}
          show={this.state.showModal}
          handleConfirm={() => this.handleConfirm(id)}
          handleCancel={this.handleCancel}>
          <div>
            Are you sure you wish to continue?
          </div>
        </ConfirmationModal>

      </React.Fragment>
    )
  }
}

export default connect(state => ({ user: state.user.currentUser }), mapDispatchToProps)(Show)
