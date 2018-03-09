import React, {Component} from 'react';
import { AccountOverview } from '../../components/Accounts';
import API from '../../utils/API';


class AccountsHome extends Component {

    state = {
        user: {
            accounts: []
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(`AccountsHome will receive: `, nextProps);
        this.setState({user: nextProps.user})
    }

    componentWillMount() {
        console.log(`AccountsHome will mount: `, this.props.user);
        this.setState({user: this.props.user})
    }

    render() {
        console.log(`AccountsHome: `, this.state);
        const accounts = this.state.user.accounts;
        if (!accounts) {
            return (<div></div>)
        }
        console.log(`Accounts Home: `, accounts);
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
                                <AccountOverview key={acc._id} account={acc}/>
                            )}
                        </div>

                    </div>
                </div>
            </main>
        );
    }
}

export default AccountsHome;
