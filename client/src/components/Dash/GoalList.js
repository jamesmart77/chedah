import React, { Component } from "react";
import { Badge, Chip } from 'react-materialize';
import Goal from './Goal';

// materialize goal list
class GoalList extends Component {

    state = {
        goals: []
    };

    render() {
        return (<ul class="collapsible dashboard" data-collapsible="expandable">
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
                    />
                ))}

            </li>
        </ul>);
    }
}

export default GoalList;
