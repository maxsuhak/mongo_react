/*
  Displays the text 'No records found' if data prop is empty.
*/

import React from 'react'
import PropTypes from 'prop-types'

const withNoRecordsFound = (WrappedComponent) => {
  return class NoRecordsFound extends React.Component {
    constructor (props) {
      super(props)

      this.state = {
        dataLoaded: false
      }
    }

    componentDidUpdate () {
      if (this.props.data && !this.state.dataLoaded) {
        this.setState({ dataLoaded: true })
      }
    }

    render () {
      let { data, noRecordsOnlyOnInitial } = this.props
      let { dataLoaded } = this.state

      const dataNotPresent = data && data.length === 0
      const skipText = noRecordsOnlyOnInitial && dataLoaded
      const shouldRenderText = dataNotPresent && !skipText
      const style = shouldRenderText ? { display: 'none' } : {}

      return (
        <div>
          <WrappedComponent style={style} {...this.props} />
          {shouldRenderText &&
            <div className='text-center'>
              <h3>
                No records found.
              </h3>
            </div>
          }
        </div>
      )
    }
  }
}

withNoRecordsFound.propTypes = {
  data: PropTypes.array,
  noRecordsOnlyOnInitial: PropTypes.boolean
}

export default withNoRecordsFound
