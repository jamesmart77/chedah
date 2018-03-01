import "./GigView.css";
import React, { Component } from "react";
import {formatCurrencyValueJSX} from '../../utils/currency';
import ExpenseChart from './ExpenseChart';


const ExpenseSummary = props =>
    <ul className="collection with-header">
        <li className="collection-header listHeader">
            <h6><i className="material-icons iconStyleSmall">pie_chart</i> EXPENSE SUMMARY</h6>
        </li>
        <ExpenseChart
            expenses={props.expenseSummary}
        />

    </ul>


export default ExpenseSummary;
