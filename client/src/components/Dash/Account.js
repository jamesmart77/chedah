import React, {Component} from "react";
import {Badge, Chip} from 'react-materialize';

// materialize account preview
// TODO: need to differentiate between checking & credit
class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            name: props.name,
            accountType: props.accountType || 'checking',
            total: props.total,
            balance: props.balance || 0,
            gigs: props.gigs || []
        };
    };

    renderGigs() {
        return (this.state.gigs.map(gig => <div class="chip">{gig}</div>));
    };

    renderChecking() {
        const gigs = this.renderGigs();
        return (<div class="row collapsible-body">
            <div class="col s8">
                <p class="collections-title">
                    <i class="material-icons inflex">attach_money</i> {this.state.name}</p>
                    {gigs}
            </div>
            <div class="col s4 account-total">
                <p>
                    <span>${this.state.total}</span>
                </p>
            </div>
        </div>);
    };

    renderCredit() {
        const gigs = this.renderGigs();
        return (<div class="row collapsible-body">
            <div class="col s8">
                <p class="collections-title">
                    <i class="material-icons inflex">credit_card</i> {this.state.name}</p>
                {gigs}
            </div>
            <div class="col s4 account-total">
                <p>
                    <span>${this.state.total}</span>
                </p>
                <p>
                    <span>${this.state.balance}</span>
                </p>
            </div>
        </div>);
    };

    render() {
        let result;

        if (this.state.accountType === 'checking') {
            result = this.renderChecking();
        } else {
            result = this.renderCredit();
        }

        return (result);
    }
}

export default Account;
