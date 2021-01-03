import React from 'react'

import { currencyValue } from '../../helpers'

const CurrencyCell = (row) => {
  const value = currencyValue(row.value)

  return (
    <React.Fragment>
      {(value !== '-') &&
        <div className='text-right'>
          <span className='pull-left'>$</span>
          {value}
        </div>
      }
      {(value === '-') && <center>{value}</center>}
    </React.Fragment>
  )
}

export default CurrencyCell
