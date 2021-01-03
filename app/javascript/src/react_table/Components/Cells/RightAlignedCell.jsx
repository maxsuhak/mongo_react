import React from 'react'

const RightAlignedCell = (xformFunction) => {
  return (row) => {
    let value = xformFunction ? xformFunction(row.value) : row.value

    return (
      <div className='text-right'>
        {value}
      </div>
    )
  }
}

export default RightAlignedCell
