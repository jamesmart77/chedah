import React, {Component} from 'react';
import { Col, Row, Container } from '../../components/Grid';
import { AccountOverview } from '../../components/Accounts';
import API from '../../utils/API';


class AccountsHome extends Component {
    state = {accounts: []}

    // load
    componentDidMount() {
      API.loadUserAccounts()
        .then(data => { console.log(data); return data})
        .then(data => this.setState({ accounts: data }))
        .catch(err => console.log(err));
    }

    render() {
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
                            {this.state.accounts.map(acc =>
                                <AccountOverview {...acc}/>
                            )}
                        </div>

                    </div>
                </div>
            </main>
        );
    }
}

export default AccountsHome;
