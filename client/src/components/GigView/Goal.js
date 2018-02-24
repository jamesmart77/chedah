import React, { Component } from "react";

const Goal = props => (


<div className="card gig-dash-card">
<div className="card-content blue-grey darken-4">
<div className="row">
    <div className="col s10">
        <span className="card-title"><span className="teal-text">Goal:</span> <span className="white-text">{props.name}</span></span>
    </div>
    <div className="col s2">
      <a href=""><i className="small material-icons right teal-text">add_circle</i></a>
      </div>
</div>

</div>
<div className="card-content white">
<div className="row">
    <div className="col m4">
        <div className="row">
            <div className="col">
                <span className="gig-dash-subtitle">Budget</span>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <span className="gig-dash-total">{<span><sup>$</sup>{props.budget}</span>}</span>
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
            <span className="gig-dash-total">{<span><sup>$</sup>{props.spent}</span>}</span>
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
            <span className="gig-dash-total">{<span><sup>$</sup>{props.net}</span>}</span>
        </div>
    </div>
</div>
</div>
</div>

);


export default Goal;