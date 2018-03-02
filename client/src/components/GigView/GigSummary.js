import React, { Component } from "react";
import "./GigView.css";
import {formatCurrencyValueJSX} from '../../utils/currency';



const GigSummary = props =>

        <ul className="gig-summary collapsible collection with-header" datacollapsible="expandable">
            <li>
                {/* Header */}
                <div className="collapsible-header listHeader">
                    <h6><i className="material-icons iconStyleSmall">track_changes</i> Gig Summary</h6>
                </div>

                {/* Body */}
                <div className='row collapsible-body'>
                    <ul>
                        <li className="collection-item">MONEY IN:<span className="right">{formatCurrencyValueJSX(props.gigSummary.moneyIn)}</span></li>
                        <li className="collection-item">EXPENSES:<span className="right">{formatCurrencyValueJSX(props.gigSummary.expenses)}</span></li>
                        <li className="collection-item">NET:<span className="right">{formatCurrencyValueJSX(props.gigSummary.net)}</span></li>
                    </ul>
                </div>
            </li>
        </ul>

export default GigSummary;
