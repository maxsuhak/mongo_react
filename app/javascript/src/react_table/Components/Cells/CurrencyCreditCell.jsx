import React from 'react'

import { currencyValue } from '../../helpers'

const CurrencyCreditCell = (row) => {
  return (
    <React.Fragment>
      {(row.value >= 0) &&
        <div className='text-right'>
          <span className='pull-left'>$</span>
          {currencyValue(row.value)}
        </div>
      }
      {(row.value < 0) &&
        <div className='text-right'>
          <span className='pull-left'>$</span>
          ({currencyValue(row.value * -1)})
        </div>
      }
    </React.Fragment>
  )
}

export default CurrencyCreditCell
