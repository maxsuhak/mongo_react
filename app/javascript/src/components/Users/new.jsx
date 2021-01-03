import React from 'react'
import { connect } from 'react-redux'
import { createUser } from '../../services/userService'
import { Link } from 'react-router-dom'
import { reduxForm } from 'redux-form'

export const mapDispatchToProps = (dispatch) => {
  return {}
}

class New extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault()

    const params = {
      first_name: event.target.first_name.value,
      last_name:  event.target.last_name.value,
      email:      event.target.email.value
    }

    return createUser(params, this.handleSuccess)
  }

  handleSuccess = (data) => {
    const { $oid } = data._id
    this.props.history.push(`/user/${$oid}`)
  }

  render() {
    return (
      <React.Fragment>
        <h1>New User</h1>

        <form id='create' className='form-horizontal' onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label className='control-label col-sm-3 col-md-2' htmlFor='first_name'>First Name</label>
            <div className='col-sm-3'>
              <input type='text' id='first_name' className='form-control' required />
            </div>
          </div>

          <div className='form-group'>
            <label className='control-label col-sm-3 col-md-2' htmlFor='last_name'>Last Name</label>
            <div className='col-sm-3'>
              <input type='text' id='last_name' className='form-control' required />
            </div>
          </div>

          <div className='form-group'>
            <label className='control-label col-sm-3 col-md-2' htmlFor='email'>Email</label>
            <div className='col-sm-3'>
              <input type='text' id='email' className='form-control' required />
            </div>
          </div>

          <div className='row'>
            <div className='col-sm-4'>
              <button type='submit' className='btn btn-primary btn-w-m m-r-sm'>Create</button>
            </div>
            <div className='col-sm-4'>
              <Link to={`/users`} className='btn btn-primary btn-w-m m-r-sm'>
                Back
              </Link>
            </div>
            <div className='col-sm-4'></div>
          </div>
        </form>
      </React.Fragment>
    )
  }
}

export default connect(null, mapDispatchToProps)(reduxForm({form: 'create'})(New))
