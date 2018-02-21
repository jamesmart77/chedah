import React, { Component } from "react";


// materialize goal preview
// props = {name: "Goal Name", value: 20, change: -10}
const Goal = props => (

    <div class="row collapsible-body">
        <div class="col s6">
            <p class="collections-title goal">{props.name}</p>
            <div class="chip">programming</div>
        </div>

        <div class="col s6 valign-wrapper">
            <span class="goal-total">{props.total}</span>
            <span class="new badge negative" data-badge-caption="">{props.change}</span>
        </div>
    </div>
);

export default Goal;
