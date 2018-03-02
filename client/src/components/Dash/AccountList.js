import React, {Component} from "react";
import {Badge, Chip} from 'react-materialize';
import Account from './Account';

// materialize account list
class AccountList extends Component {

    state = {
        accounts: [
            {
                id: 1,
                name: 'Chase Mastercard',
                total: 58897.26,
                balance: 32.26,
                accountType: 'credit',
                gigs: ['uber']
            },
            {
                id: 2,
                name: 'Checking',
                total: 14120.21,
                balance: 0,
                accountType: 'checking',
                gigs: ['uber']
            }
        ]
    };

    render() {
        return (
            <ul className="collapsible dashboard" data-collapsible="expandable">
                <li>
                    <div className="dashboard collapsible-header">
                        <i className="material-icons">account_balance</i>Accounts
                    </div>

                    {this.state.accounts.map((account, i) => (
                        <Account
                            key={i}
                            id={account.id}
                            name={account.name}
                            total={account.total}
                            balance={account.balance}
                            accountType={account.accountType}
                            gigs={account.gigs}
                        />
                    ))}
                </li>
            </ul>
        );
    }
}

export default AccountList;
