import React, { Component } from "react";
import { Badge, Chip } from 'react-materialize';
import Goal from './Goal';

// materialize goal list
class GoalList extends Component {

    state = {
        goals: [
            {
                id: 1,
                name: 'New brakes',
                total: 80,
                change: 17,
                gigs: ['uber']
            }, {
                id: 2,
                name: 'Bootcamp tuition',
                total: 20,
                change: -14,
                gigs: ['programming']
            }
        ]
    };

    render() {
        return (
            <ul className="collapsible dashboard" data-collapsible="expandable">
                <li>
                    <div className="dashboard collapsible-header">
                        <i className="material-icons">insert_chart</i>Goals
                    </div>

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
