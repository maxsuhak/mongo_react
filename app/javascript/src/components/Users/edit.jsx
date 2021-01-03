import React from 'react'
import { connect } from 'react-redux'
import { fetchUser, updateUser } from '../../services/userService'
import { setCurrentUser } from '../../actions'
import { Link } from 'react-router-dom'
import { reduxForm } from 'redux-form'

export const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (id) => {
      fetchUser(id).then((data) => {
        dispatch(setCurrentUser(data))
      })
    }
  }
}

class Edit extends React.Component {
  componentDidMount () {
    const { id } = this.props.match.params
    this.props.fetchUser(id)
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { id } = this.props.match.params
    const params = {
      first_name: event.target.first_name.value,
      last_name:  event.target.last_name.value,
      email:      event.target.email.value
    }

    return updateUser(id, params, this.handleSuccess)
  }

  handleSuccess = (data) => {
    const { $oid } = data._id
    this.props.history.push(`/user/${$oid}`)
  }

  render() {
    const { id } = this.props.match.params
    const { first_name, last_name, email } = this.props.user

    return (
      <React.Fragment>
        <h1>Edit User</h1>

        <form id='edit' className='form-horizontal' onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label className='control-label col-sm-3 col-md-2' htmlFor='first_name'>First Name</label>
            <div className='col-sm-3'>
              <input type='text' id='first_name' className='form-control' defaultValue={first_name || ''} required />
            </div>
          </div>

          <div className='form-group'>
            <label className='control-label col-sm-3 col-md-2' htmlFor='last_name'>Last Name</label>
            <div className='col-sm-3'>
              <input type='text' id='last_name' className='form-control' defaultValue={last_name || ''} required />
            </div>
          </div>

          <div className='form-group'>
            <label className='control-label col-sm-3 col-md-2' htmlFor='email'>Email</label>
            <div className='col-sm-3'>
              <input type='text' id='email' className='form-control' defaultValue={email || ''} required />
            </div>
          </div>

          <div className='row'>
            <div className='col-sm-4'>
              <button type='submit' className='btn btn-primary btn-w-m m-r-sm'>Update</button>
            </div>
            <div className='col-sm-4'>
              <Link to={`/user/${id}`} className='btn btn-primary btn-w-m m-r-sm'>
                Back
              </Link>
            </div>
            <div className='col-sm-4'>
            </div>
          </div>
        </form>
      </React.Fragment>
    )
  }
}

export default connect(state => ({ user: state.user.currentUser }), mapDispatchToProps)(reduxForm({form: 'edit'})(Edit))
