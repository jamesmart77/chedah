import React from 'react'
import Transaction from './Transaction'

const TransactionSummary = props => <div className='card'>
  <div className='card-content cardHeader'>
    <div className='row'>
      <div className='col s12'>
        <span className='card-title'><span className='primaryHeaderText'>Transactions: </span> <span className='secondaryHeaderText'>{'Uber'}</span></span>
      </div>

    </div>

  </div>
  <div className='card-content cardBody'>
    <div className='row'>
      <div className='col s12'>
        {console.log('props.data')}
        {console.log(props.data)}
        <Transaction {...props} />

      </div>

    </div>
  </div>
</div>

export default TransactionSummary
