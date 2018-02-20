import React from "react";
import "./Panel.css";
// This is created by Ben, don't delete
const Panel = (props) =>
  <div className={"card " + props.color}>
    <div className="card-content white-text">
      <p className="center">{props.title}</p>
      <p className={"center jumbo-text " + props.css}>{props.value}</p>
    </div>
  </div>

export default Panel;
