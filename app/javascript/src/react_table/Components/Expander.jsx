import React from 'react'
import classnames from 'classnames'

export default ({ allExpanded, onAllExpandedChange }) => {
  return (
    <div className={classnames('rt-expander', allExpanded && '-open')} onClick={onAllExpandedChange}>&bull;</div>
  )
}
