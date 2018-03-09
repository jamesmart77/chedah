import React, {Component} from 'react';
import { AccountOverview } from '../../components/Accounts';
import API from '../../utils/API';


class AccountsHome extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: {}
          }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({user: nextProps.user})
    }

    render() {
        const accounts = this.props.user.accounts;
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
