import React, { Component } from 'react';
import './Accounts.css';

// Account detail page
class CreditCardAPR extends Component {

    constructor(props) {
        super(props);
        console.log(`-> APR: `, props);
    };

    render() {
        return (
            <div className="card">
                <div className="card-content teal accent-4 white-text">
                    <p className="card-stats-title">
                        <i className="material-icons">trending_up</i> Fees</p>
                    <h4 className="card-stats-number">$86.52</h4>
                    <p className="card-stats-compare">
                        <span className="teal-text text-lighten-5">based on an APR of 7%</span>
                    </p>
                </div>
        </div>
        )
    }
}


export default CreditCardAPR;
