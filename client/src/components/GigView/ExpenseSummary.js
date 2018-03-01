import "./GigView.css";
import React, { Component } from "react";
import {formatCurrencyValueJSX} from '../../utils/currency';


const ExpenseSummary = props => <ul className="collection with-header">
        <li className="collection-header listHeader"><h6><i className="material-icons iconStyleSmall">pie_chart</i> EXPENSE SUMMARY</h6></li>
        {props.expenseSummary.map(expense =>  <li key={expense.vendorName} className="collection-item">{expense.vendorName}<span className="right">{formatCurrencyValueJSX(expense.sum)}</span></li>)
        }
    </ul>

export default ExpenseSummary;