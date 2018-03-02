import React, { Component } from "react";
import "./GigView.css";
import {formatCurrencyValueJSX} from '../../utils/currency';


const GigSummary = props => <ul className="collection with-header">
{console.log(props)}
            <li className="collection-header listHeader"><h6><i className="material-icons iconStyleSmall">track_changes</i> GIG SUMMARY</h6></li>
            <li className="collection-item">MONEY IN:<span className="right">{formatCurrencyValueJSX(props.gigSummary.moneyIn)}</span></li>
            <li className="collection-item">EXPENSES:<span className="right">{formatCurrencyValueJSX(props.gigSummary.expenses)}</span></li>
            <li className="collection-item">NET:<span className="right">{formatCurrencyValueJSX(props.gigSummary.net)}</span></li>
        </ul>

export default GigSummary;