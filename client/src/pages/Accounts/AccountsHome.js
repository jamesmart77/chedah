import React, {Component} from 'react'
import { AccountOverview } from '../../components/Accounts'
import API from '../../utils/API'

class AccountsHome extends Component {
  constructor (props) {
    super(props)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({user: nextProps.user})
  }

  render () {
    const accounts = this.props.user.accounts || []
    const hasAccounts = (accounts.length > 0)

    if (!hasAccounts) {
      return (<div className='row pl-2'>
        <h6>Please link an account</h6>
      </div>
      )
    }
    console.log(`Accounts Home: `, accounts)
    return (
      <main className='m8'>
        <div className='container-fluid padding-1'>
          <div className='row'>
            <div className='col s12'>
              <h4 className='dash-title'>Accounts</h4>
            </div>
          </div>

          <div className='row'>
            <div className='col s12'>
              {accounts.map(acc =>

                <AccountOverview
                  key={acc.account_id}
                  account={acc}
                  user={this.props.user}
                />
              )}
            </div>

          </div>
        </div>
      </main>
    )
  }
}

export default AccountsHome

// () => <AccountDetail onSelectLanguage={this.handleLanguage}
