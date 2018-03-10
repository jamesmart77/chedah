import React, { Component } from "react";


// materialize goal preview
/*
  _id:"73829y4iu32h4jkh24242334"
  budget:200
  categories:Array[2]
  expenses:150
  gigId:"5aa3270d69380a4b6e769447"
  name:"Spend Less on Gas"
  net:50
  percent:0.75
*/
class Goal extends Component {

    constructor(props) {
        super(props);
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
        const cname = (this.props.net >= 0) ? 'new badge teal' : 'new badge negative red';
        const goalRef = `goals/${this.props._id}`;
        let budget = this.props.budget
        let expenses = this.props.expenses
        var percent = Math.round(this.props.percent * 100)
        var netString = (this.props.net >= 0) ? `+${this.props.net}` : `${this.props.net}`
        return (
            <div className='row collapsible-body'>
                <div className='row valign-wrapper'>

                    <div className='col s8'>
                        <a className="side-headers" href={goalRef}> {this.props.name}</a>
                    </div>

                    <div className='col s4 valign-wrapper'>
                        <span className="goal-total">{percent}%</span>
                        {/* <span dataBadgeCaption="ass">{this.props.net}</span> */}
                        <span className={cname} data-badge-caption="">{netString}</span>
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
