import React from "react";
import Goal from './Goal';
import "./GigView.css";


const GoalSummary = props=> <div>
    {props.goals.map((goal) => (
        <Goal
            key={goal._id}
            editGoal={props.editGoal}
            id={goal._id}
            name={goal.name}
            budget={goal.budget}
            spent={goal.expenses}
            net={goal.net}
            categories={goal.categories}
            user={props.user}
            refresh={ props.refresh }
        />
    ))}
</div>


export default GoalSummary;
