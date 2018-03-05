import React, { Component } from "react";
import { Badge, Chip } from 'react-materialize';
import Goal from './Goal';

// materialize goal list
class GoalList extends Component {

    state = {
        collapsed: false,
        goals: [
            {
                id: 1,
                name: 'Spend Less On Tolls',
                total: 80,
                change: 17,
                gigs: ['uber']
            }, {
                id: 2,
                name: 'Spend Less on Gas',
                total: 20,
                change: -14,
                gigs: ['uber']
            },
            {
                id: 3,
                name: 'Save for Programming Books',
                total: 20,
                change: -14,
                gigs: ['programming']
            }
        ]
    };

    handleClick() {
        this.setState({collapsed: !this.state.collapsed})
    }

    render() {
        const arrowName = (this.state.collapsed === false) ? 'arrow_drop_down' : 'arrow_drop_up';
        return (

            <ul className="goal-summary collapsible collection with-header" datacollapsible="expandable">
                <li>
                    {/* Header */}
                    <div className="collapsible-header listHeader" onClick={this.handleClick.bind(this)}>
                        <h6><i className="material-icons iconStyleSmall">pie_chart</i> Goals</h6>
                        <i className="header-expand-state material-icons">{arrowName}</i>
                    </div>

                    {/* Body insert_chart */}
                    {this.state.goals.map((goal, i) => (
                        <Goal
                            key={i}
                            id={goal.id}
                            name={goal.name}
                            total={goal.total}
                            change={goal.change}
                            gigs={goal.gigs}
                        />
                    ))}
                </li>
            </ul>
        );
    };
}

export default GoalList;
