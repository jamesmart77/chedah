import React from 'react'
import API from '../../utils/API'

// navbar refresh button
class RefreshButton extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      updated: false,
      isBusy: false
    }

    this.updateUser = this.updateUser.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({isBusy: false})

    if (!this.state.updated) {
      // window.Materialize.toast(`Synced ${tcount} transactions`, 2000)
    }
  }

  updateUser () {
    API.accountsSync()
    this.setState({updated: true, isBusy: true})
  }

  getTransactions () {
    return this.props.user.accounts || []
  }

  render () {
    const accounts = this.getTransactions()
    // update the look of the button based on whether we've fetched transactions
    let tcount = 0
    accounts.forEach(acct => {
      tcount += acct.transactions.length
    })

    if (tcount > 0) {
      if (!this.state.updated) {

      }
    }

    const pulseValue = (tcount == 0) ? 'pulse' : ''
    const tooltipState = (tcount == 0) ? ' tooltipped' : ''
    const spinState = (this.state.isBusy) ? ' spin' : ''
    return (
      <li className='refresh-btn'>
        <a onClick={this.updateUser} data-position='bottom' data-delay='50' data-tooltip='sync account & transaction' className={'waves-effect waves-light btn-floating z-depth-2 ' + pulseValue + tooltipState + spinState}>
          <i className='material-icons right'>autorenew</i>
        </a>
      </li>
    )
  }
}

export default RefreshButton
