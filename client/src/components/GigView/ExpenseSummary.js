import "./GigView.css";
import React from "react";
import {formatCurrencyValueJSX} from '../../utils/currency';
import ExpenseChart from './ExpenseChart';
const $ = require('jquery');


class ExpenseSummary extends React.Component {
    state = {
        collapsed: false
    }

    handleClick() {
        this.setState({collapsed: !this.state.collapsed})
    }

    componentDidMount() {
        window.$('.collapsible-header').addClass('active')
        window.$('.collapsible').collapsible({accordian: false})
    }

    componentDidUpdate() {
        window.$('.collapsible').collapsible({accordian: false})
    }

    render() {
        const arrowName = (this.state.collapsed === false) ? 'arrow_drop_down' : 'arrow_drop_up';
        return (
            <ul className="gig-summary collapsible collection with-header" datacollapsible="expandable">
                <li>

                    <div className="collapsible-header listHeader" onClick={this.handleClick.bind(this)}>
                        <h6><i className="material-icons iconStyleSmall">account_balance</i> EXPENSE SUMMARY</h6>
                        <i className="header-expand-state material-icons">{arrowName}</i>
                    </div>

                    <div className='row'>
                        <ExpenseChart
                            expenses={this.props.expenses}
                            gigName={this.props.gigName}
                            total={this.props.total}
                        />
                    </div>
                </li>
            </ul>
        )
    }
}


export default ExpenseSummary;
