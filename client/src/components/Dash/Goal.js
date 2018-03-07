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

        this.handleClick = this.handleClick.bind(this);
    };

    handleClick(e) {
        console.log(`clicked: ${e.target.value}`);
    }

    renderGigs() {
        return (this.state.gigs.map((gig, i) =>
            <div key={i} onClick={this.handleClick} className="chip">{gig}</div>
        ));
    };

    render() {
        const cname = (this.state.change >= 0) ? 'new badge teal' : 'new badge negative red';
        const totalString = (this.state.change >= 0) ? `+${this.state.change}` : `${this.state.change}`;
        const gigs = this.renderGigs();
        const goalRef = `goals/${this.props._id}`;
        return (
            <div className='row collapsible-body'>
                <div className='row valign-wrapper'>

                    <div className='col s6'>
                        <a className="side-headers" href={goalRef}> {this.props.name}</a>
                    </div>

                    <div className='col s6 valign-wrapper'>
                        <span className="goal-total">{this.state.total}%</span>
                        <span className={cname} data-badge-caption="">{totalString}</span>
                    </div>
                </div>

                <div className='row pl-1'>
                    <div className='col s12'>
                        <div className='chip'>No Gig</div>
                    </div>
                </div>
            </div>

        );
    };
};


export default Goal;
