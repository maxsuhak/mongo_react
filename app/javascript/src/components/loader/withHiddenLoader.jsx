import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

const withHiddenLoader = (WrappedComponent) => {
  return class InitialLoader extends React.Component {
    render () {
      let { isLoading, data } = this.props
      let loaderStyle = { display: 'none' }
      let componentStyle = {}

      if (isLoading === undefined) {
        isLoading = data === null
      }

      if (isLoading) {
        [loaderStyle, componentStyle] = [componentStyle, loaderStyle]
      }

      return (
        <div>
          <div className='text-center loading' style={loaderStyle}>
            <div className='loading-bar' />
            <div className='loading-bar' />
            <div className='loading-bar' />
            <div className='loading-bar' />
            <br />
            <br />
          </div>
          <div className='loaded-component' style={componentStyle}>
            <WrappedComponent {...this.props} />
          </div>
        </div>
      )
    }
  }
}

PropTypes.withHiddenLoader = {
  isLoading: PropTypes.bool,
  data: PropTypes.object
}

export default withHiddenLoader
