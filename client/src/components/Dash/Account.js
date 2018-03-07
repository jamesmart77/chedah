import React, { Component } from 'react';
// import { Badge, Chip } from 'react-materialize';
import { formatCurrencyValueJSX } from '../../utils/currency';



// materialize account previewx
class Account extends Component {

    constructor(props) {
        super(props);
        console.log(`-> Account: `);
        console.log(props);
    };

    renderGigs() {
        const gigList = (this.props.gigs) || []
        return (gigList.map((gig, i) => <div key={i} className='chip'>{gig}</div>));
    };

    renderChecking() {
        const gigs = this.renderGigs();
        const checkingTotal = formatCurrencyValueJSX(this.props.balance);
        const accountHref = `accounts/${this.props._id}`;
        return (
            <div className='row collapsible-body'>
                <div className='col s8'>
                    <p className='collections-title'>
                        <i className='material-icons inflex'>attach_money</i>
                        <a className="side-headers" href={accountHref}>{this.props.name}</a>
                    </p>
                    {gigs}
                </div>
                <div className='col s4 account-total'>
                    <p>
                        <span>{checkingTotal}</span>
                    </p>
                </div>
            </div>
        );
    };

    renderCredit() {
        const gigs = this.renderGigs();
        const creditTotal = formatCurrencyValueJSX(this.props.limit);
        const creditBalance = formatCurrencyValueJSX(this.props.balance);
        const accountHref = `accounts/${this.props._id}`;
        return (
            <div key={this.props._id} className='row collapsible-body'>
                <div className='col s8'>
                    <p className='collections-title'>
                        <i className='material-icons inflex'>credit_card</i> <a className="side-headers" href={accountHref}>{this.props.name}</a></p>
                    {gigs}
                </div>
                <div className='col s4 account-total'>
                    <p>
                        <span>{creditTotal}</span>
                    </p>
                    <p>
                        <span>{creditBalance}</span>
                    </p>
                </div>
            </div>
        );
    };

    render() {
        let result;

        if (this.props.accountType === 'checking') {
            result = this.renderChecking();
        } else {
            result = this.renderCredit();
        }

        return (result);
    }
}

export default Account;
