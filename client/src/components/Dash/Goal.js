import React, { Component } from "react";


// materialize goal preview
// props = {name: "Goal Name", value: 20, change: -10}
class Goal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            name: props.name,
            total: props.total || 0,
            change: props.change || 0,
            gigs: props.gigs || []
        };
    };

    renderGigs() {
        return (this.state.gigs.map(gig => <div class="chip">{gig}</div>));
    };

    render() {
        const className = (this.state.change >= 0) ? 'new badge' : 'new badge negative';
        const totalString = (this.state.change >= 0) ? `+${this.state.change}` : `${this.state.change}`;
        const gigs = this.renderGigs();
        return (
            <div class="row collapsible-body">
                <div class="col s8">
                    <p class="collections-title goal truncate">{this.state.name}</p>
                    {gigs}
                </div>

                <div class="col s4 valign-wrapper">
                    <span class="goal-total">{this.state.total}%</span>
                    <span class={className} data-badge-caption="">{totalString}</span>
                </div>
            </div>
        );
    };
};


export default Goal;
