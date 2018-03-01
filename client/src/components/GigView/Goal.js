import React, { Component } from "react";
import "./GigView.css";
import {formatCurrencyValueJSX} from '../../utils/currency';

const Goal = props => (


<div className="card">
<div className="card-content cardHeader">
<div className="row">
    <div className="col s11">
        <span className="card-title"><span className="primaryHeaderText">Goal:</span> <span className="secondaryHeaderText">{props.name}</span></span>
    </div>
    <div className="col s1">
      <a href="#" onClick={ () => props.editGoal(props.id)}><i className="material-icons iconStyleMed">settings</i></a>
      </div>
</div>

</div>
<div className="card-content cardBody">
<div className="row">
    <div className="col m4">
        <div className="row">
            <div className="col">
                <span className="gig-dash-subtitle">Budget</span>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <span className="gig-dash-total">{formatCurrencyValueJSX(props.budget)}</span>
            </div>
        </div>
    </div>

  
    <div className="col m4">
        <div className="row">
            <div className="col">
                <span className="gig-dash-subtitle">Expenses</span>
            </div>
        </div>
        <div className="row">
            <span className="gig-dash-total">{formatCurrencyValueJSX(props.spent)}</span>
        </div>
    </div>

    {/* Net */}
    <div className="col m4">
        <div className="row">
            <div className="col">
                <span className="gig-dash-subtitle">Net</span>
            </div>
        </div>
        <div className="row">
            <span className="gig-dash-total">{formatCurrencyValueJSX(props.net)}</span>
        </div>
    </div>
</div>
</div>
</div>

);


export default Goal;