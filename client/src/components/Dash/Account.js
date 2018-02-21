import React, { Component } from "react";
import { Badge, Chip } from 'react-materialize';

// materialize account preview
// TODO: need to differentiate between checking & credit
class Account extends Component {
    state = {
        accounts: []
    };

    render() {
        return (
            <div class="row collapsible-body">
                <div class="col s6">
                    <p class="collections-title">
                        <i class="material-icons inflex">credit_card</i>Checking</p>
                    <div class="chip">Uber</div>
                    <div class="chip">programming</div>
                </div>
                <div class="col s6 account-total">
                    <p>
                        <span>$23,500</span>
                    </p>
                </div>
            </div>);
    }
}


export default Account ;
