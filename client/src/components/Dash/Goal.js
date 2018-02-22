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
        return (this.state.gigs.map((gig, i) => <div key={i} className="chip">{gig}</div>));
    };

    render() {
        const cname = (this.state.change >= 0) ? 'new badge' : 'new badge negative';
        const totalString = (this.state.change >= 0) ? `+${this.state.change}` : `${this.state.change}`;
        const gigs = this.renderGigs();
        return (
            <div className="row collapsible-body">
                <div className="col s8">
                    <p className="collections-title goal truncate">{this.state.name}</p>
                    {gigs}
                </div>

                <div className="col s4 valign-wrapper">
                    <span className="goal-total">{this.state.total}%</span>
                    <span className={cname} data-badge-caption="">{totalString}</span>
                </div>
            </div>
        );
    };
};


export default Goal;
