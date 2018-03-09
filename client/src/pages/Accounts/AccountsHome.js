import React, {Component} from 'react';
import { AccountOverview } from '../../components/Accounts';
import API from '../../utils/API';


class AccountsHome extends Component {
    state = {accounts: []}

    componentWillMount() {
        API.loadUserData()
        .then(userData => {
            this.setState(userData)
            console.log(`-> AccountsHome: `, userData);
        })
        .catch(console.log)
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
                                <AccountOverview key={acc._id} {...acc}/>
                            )}
                        </div>

                    </div>
                </div>
            </main>
        );
    }
}

export default AccountsHome;
