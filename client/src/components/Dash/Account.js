import React, { Component } from 'react';
// import { Badge, Chip } from 'react-materialize';
import { formatCurrencyValueJSX } from '../../utils/currency';
// materialize account preview widget


class Account extends Component {

    renderGigs() {
        const gigList = (this.props.gigs) || []
        return (gigList.map((gig, i) => <div key={i} className='chip'>{gig}</div>));
    };

    componentWillReceiveProps(nextProps) {
        console.log(`Account getting props: `, nextProps);
        this.setState({...nextProps})
    }

    componentWillMount() {
        console.log(`Account getting props: `, this.props);
        this.setState({...this.props})
    }

    renderChecking() {
        // const gigs = this.renderGigs();
        const checkingTotal = formatCurrencyValueJSX(this.props.balance);
        const accountHref = `accounts/${this.props._id}`;
        return (
            <div className='row collapsible-body'>
                <div className='row'>
                <div className='col s8'>
                        <i className='material-icons inflex'>attach_money</i>
                        <a className="side-headers" href={accountHref}> {this.props.name}</a>
                    </div>
                    <div className='col s4 account-total'>{checkingTotal}</div>
                </div>

                <div className='row pl-1'>

                    <div className='col s12'>
                        <div className='chip'>No Gig</div>
                    </div>

                </div>
            </div>
        );
    };

    renderCredit() {
        // available, current, limit
        console.log(`credit: `, this.props.balances);
        // const gigs = this.renderGigs();
        const creditTotal = formatCurrencyValueJSX(this.props.balances.limit);
        const creditBalance = formatCurrencyValueJSX(this.props.balances.current);
        const accountHref = `accounts/${this.props._id}`;
        return (

                <div className='row collapsible-body'>
                <div className='row'>
                    <div className='col s8'>
                        <i className='material-icons inflex'>credit_card</i>
                        <a className="side-headers" href={accountHref}> {this.props.name}</a>
                    </div>
                    <div className='col s4 account-total'>{creditBalance}</div>
                </div>

                <div className='row pl-1'>

                <div className='col s8'>
                        <div className='chip'>No Gig</div>
                    </div>
                    <div className='col s4 account-total right-align'>
                        <div>{creditTotal}</div>
                </div>

                </div>
            </div>

        )
    };

    render() {
        let result;
        console.log(`Account rendering: `, this.props);
        if ((this.props.subtype === 'checking') || (this.props.subtype === 'savings')) {
            result = this.renderChecking();
        } else {
            result = this.renderCredit();
        }

        return (result);
    }
}

export default Account;
