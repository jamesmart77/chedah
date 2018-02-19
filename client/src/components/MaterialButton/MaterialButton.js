import React from "react";
import "./MaterialButton.css";

// This is created by Ben, don't delete
const MaterialButton = (props) =>
    <div class="button-wrapper">
        <h3 class="material-header">{props.children}</h3>
            <a class="btn-floating btn-large teal">
                <i class="large material-icons">{props.type}</i>
            </a>
    </div>


export default MaterialButton;
