import React, { Component } from "react";

const Transaction = props => (

    <tr>
    <td>{props.date}</td>
    <td>{props.vendor}</td>
    <td>{props.category}</td>
    <td>{props.gig}</td>
    <td>{props.amount}</td>
  </tr>

);


export default Transaction;





