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
            <ul class="collapsible dashboard" data-collapsible="expandable">
                <li>
                    <div class="dashboard collapsible-header">
                        <i class="material-icons">insert_chart</i>Goals
                    </div>

                    {this.state.goals.map(goal => (
                        <Goal
                            name={goal.name}
                            id={goal.id}
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
