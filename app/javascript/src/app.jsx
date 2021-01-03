import React from 'react'
import Base from './containers'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Base />
      </React.Fragment>
    )
  }
}

export default withRouter(connect(state => ({ user: state.user }))(App))
