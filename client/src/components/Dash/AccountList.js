import React, {Component} from "react";
import {Badge, Chip} from 'react-materialize';
import Account from './Account';

// materialize account list
class AccountList extends Component {

    state = {
        accounts: [
            {
                id: 1,
                name: 'Checking',
                total: 12000,
                balance: 1200,
                accountType: 'checking',
                gigs: ['uber']
            }, {
                id: 2,
                name: 'Citi Visa',
                total: 8000,
                balance: 800,
                accountType: 'credit',
                gigs: ['uber']
            }, {
                id: 3,
                name: 'Chase Mastercard',
                total: 12000,
                balance: 1000,
                accountType: 'credit',
                gigs: ['uber', 'programming']
            }
        ]
    };

    render() {
        return (<ul class="collapsible dashboard" data-collapsible="expandable">
            <li>
                <div class="dashboard collapsible-header">
                    <i class="material-icons">account_balance</i>Accounts
                </div>

                {this.state.accounts.map(account => (
                    <Account
                        name={account.name}
                        id={account.id}
                        total={account.total}
                        balance={account.balance}
                        accountType={account.accountType}
                        gigs={account.gigs}
                    />
                ))}
            </li>
        </ul>);
    }
}

export default AccountList;
