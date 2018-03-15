import React from 'react'
import { formatCurrencyValueJSX } from '../../utils/currency'
import { GigChip } from '../Material'

// materialize account preview widget
class Account extends React.Component {
  componentWillReceiveProps (nextProps) {
    this.setState({...nextProps})
  }

  renderChecking () {
    const checkingBalance = formatCurrencyValueJSX(this.props.balances.current)
    const accountHref = `accounts/${this.props.account_id}`
    const defaultGig = (this.props.defaultGigName === 'Personal')
    return (
      <div className='row collapsible-body'>
        <div className='row'>
          <div className='col s8 tooltipped' dataposition='top' datadelay='50' datatooltip={this.props.official_name}>
            <i className='material-icons inflex'>attach_money</i>
            <a className='side-headers' href={accountHref}> {this.props.name}</a>
          </div>
          <div className='col s4 account-total'>{checkingBalance}</div>
        </div>

        <div className='row pl-1'>

          <div className='col s12'>
            <GigChip
              gig={this.props.defaultGigName}
              gigId={this.props.defaultGigId}
              isDefault={defaultGig}
            />
          </div>

        </div>
      </div>
    )
  };

  renderCredit () {
    // available, current, limit
    const creditTotal = formatCurrencyValueJSX(this.props.balances.limit)
    const creditBalance = formatCurrencyValueJSX(this.props.balances.current)
    const accountHref = `accounts/${this.props.account_id}`
    const defaultGig = (this.props.defaultGigName === 'Personal')
    return (
      <div className='row collapsible-body'>
        <div className='row'>
          <div className='col s8'>
            <i className='material-icons inflex'>credit_card</i>
            <a className='side-headers' href={accountHref}> {this.props.name}</a>
          </div>
          <div className='col s4 account-total'>{creditBalance}</div>
        </div>

        <div className='row pl-1'>

          <div className='col s8'>
            <GigChip
              gig={this.props.defaultGigName}
              gigId={this.props.defaultGigId}
              isDefault={defaultGig}
            />
          </div>

          <div className='col s4 account-total right-align'>
            <div>{creditTotal}</div>
          </div>

        </div>
      </div>

    )
  };

  render () {
    let result
    if (this.props.type === 'credit') {
      result = this.renderCredit()
    } else {
      result = this.renderChecking()
    }

    return (result)
  }
}

export default Account
