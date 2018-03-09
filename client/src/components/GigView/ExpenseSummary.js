import "./GigView.css";
import React from "react";
import {formatCurrencyValueJSX} from '../../utils/currency';
import ExpenseChart from './ExpenseChart';


const ExpenseSummary = props =>
    <ul className="gig-summary collapsible collection with-header" datacollapsible="expandable">
        <li>
            {/* Header */}
            <div className="collapsible-header listHeader">
                <h6><i className="material-icons iconStyleSmall">pie_chart</i> EXPENSE SUMMARY</h6>
            </div>

            {/* Body */}
			{console.log(`props: `)}
			{console.log(props)}
            <div className='row'>
                <ExpenseChart
                    expenses={props.expenses}
                    gigName={props.gigName}
                    total={props.total}
                />
            </div>
        </li>
    </ul>


export default ExpenseSummary;
