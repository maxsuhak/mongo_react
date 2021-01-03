import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Header from '../components/layout/header'
import Footer from '../components/layout/footer'

import Users  from '../components/Users'
import Show   from '../components/Users/show'
import Edit   from '../components/Users/edit'
import New    from '../components/Users/new'

import Search from '../components/Search'

import Errors from '../components/Errors'

const DefaultLayout = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      <React.Fragment>
        <Header />
        <div className='container'>
          <Component key={props.location.pathname} {...props} />
        </div>
        <Footer />
      </React.Fragment>
    )}
    />
  )
}

const Base = (props) => (
  <Switch>
    <DefaultLayout path='/'              exact component={Users}  />
    <DefaultLayout path='/users'         exact component={Users}  />
    <DefaultLayout path='/user/new'      exact component={New}    />
    <DefaultLayout path='/user/:id'      exact component={Show}   />
    <DefaultLayout path='/user/:id/edit'       component={Edit}   />
    <DefaultLayout path='/search'              component={Search} />
    <Route         path='/reload'              component={null}   />
    <DefaultLayout                             component={Errors} />
  </Switch>
)

export default withRouter(connect(state => ({ user: state.user }))(Base))
