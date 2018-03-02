import "./GigView.css";
import React, { Component } from "react";
import {formatCurrencyValueJSX} from '../../utils/currency';
import ExpenseChart from './ExpenseChart';


const ExpenseSummary = props =>
    <ul className="gig-summary collapsible collection with-header" dataCollapsible="expandable">
        <li>
            {/* Header */}
            <div className="collapsible-header listHeader">
                <h6><i className="material-icons iconStyleSmall">pie_chart</i> EXPENSE SUMMARY</h6>
            </div>

            {/* Body */}
            <div className='row collapsible-body'>
                <ExpenseChart
                    expenses={props.expenseSummary}
                />
            </div>
        </li>
    </ul>


export default ExpenseSummary;
