import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setSearchQuery } from '../../actions'

export const mapDispatchToProps = (dispatch) => {
  return {
    setSearchQuery: (q) => {
      dispatch(setSearchQuery(q))
    }
  }
}

class Header extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault()
    const query = event.target.search.value

    this.props.setSearchQuery(query)

    this.props.history.replace({
      pathname: '/search',
      search: '?q=' + query
    })

    this.searchForm.reset()
  }

  render() {
    return (
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to='/'>RailsMongoReact</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to='/users'>Users</Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to='/user/new'>New User</Link>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0" onSubmit={this.handleSubmit} ref={(el) => this.searchForm = el}>
              <input
                className="form-control mr-sm-2"
                id="search"
                type="search"
                placeholder="Search"
                aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>
      </header>
    )
  }
}

export default connect(null, mapDispatchToProps)(withRouter(Header))
