/* DEPRECATED, PLEASE USE withLoader INSTEAD */

import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'

const Loader = ({ loading, children }) => {
  return (
    <React.Fragment>
      { loading &&
        <div className='text-center loading'>
          <div className='loading-bar' />
          <div className='loading-bar' />
          <div className='loading-bar' />
          <div className='loading-bar' />
          <br />
          <br />
        </div> }

      { !loading &&
        <div className='loaded-component'>
          {children}
        </div> }
    </React.Fragment>
  )
}

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
}

export default Loader
