import React from 'react'
import PropTypes from 'prop-types'
import Loader from './Loader.jsx'

import './styles.scss'

const withLoader = (WrappedComponent) => {
  return class InitialLoader extends React.Component {
    render () {
      let { isLoading } = this.props

      if (isLoading === undefined) {
        isLoading = this.props.data === null
      }

      return (
        <Loader loading={isLoading}>
          <WrappedComponent {...this.props} />
        </Loader>
      )
    }
  }
}

PropTypes.withLoader = {
  isLoading: PropTypes.bool,
  data: PropTypes.object
}

export default withLoader
