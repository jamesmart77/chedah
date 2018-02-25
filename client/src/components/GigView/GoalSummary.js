import React, { Component } from "react";
import Goal from './Goal';
import "./GigView.css";


class GoalSummary extends Component {

    state = {
        goals:  [
            { name:"Spend Less On Tolls", budget: 200, spent: 100, net: 100 },
            { name:"Another Goal Goes Here", budget: 425, spent: 300, net: 125 },            
        ]
    };

    // editGoal(){
    //     API.editGoal(goal)
    //         .then(res =>)
    // }

    render() {
        return (
            <div>
                {this.state.goals.map((goal) => (
                    <Goal
                        // editGoal={this.editGoal.bind(this)}
                        name={goal.name}
                        budget={goal.budget}
                        spent={goal.spent}
                        net={goal.net}
                       
                    />
                ))}
            </div>

        );
    }
}


export default GoalSummary;
