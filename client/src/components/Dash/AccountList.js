import React, { Component } from "react";
import { Badge, Chip } from 'react-materialize';
import Account from './Account';

// materialize account list
class AccountList extends Component {

    state = {
        accounts: []
    };

    render() {
        return (
            <ul class="collapsible dashboard" data-collapsible="expandable">
                <li>
                    <div class="dashboard collapsible-header">
                        <i class="material-icons">account_balance</i>Accounts
                    </div>

                    {this.state.accounts.map(account => (
                        <Account
                            name={account.name}
                            id={account.id}
                            total={account.total}
                            change={account.change}
                        />
                    ))}
                </li>
            </ul>
        );
    }
}

export default AccountList;
