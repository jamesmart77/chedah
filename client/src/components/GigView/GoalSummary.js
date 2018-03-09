import React from "react";
import Goal from './Goal';
import "./GigView.css";


const GoalSummary = props=> <div>
    {props.goals.map((goal) => (
        <Goal
            key={goal.id}
            editGoal={props.editGoal}
            id={goal.id}
            name={goal.name}
            budget={goal.budget}
            spent={goal.expenses}
            net={goal.net}  
        />
    ))}
</div>


export default GoalSummary;
