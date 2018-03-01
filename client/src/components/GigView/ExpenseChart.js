import React, { Component } from 'react';
const Doughnut = require('react-chartjs').Doughnut;


/*
const ExpenseChart = React.createClass({
  render: function() {
    return <Doughnut data={props.data} options={props.options}/>
  }
});
*/

const chartData = {
    borderWidth: 1,
    datasets: [
        {
            label: 'Expense Breakdown',
            data: [825.00, 200.00, 500],
            backgroundColor: [
                '#ff6f00',
                '#ffa040',
                '#c43e00'
            ]
        }
    ],

    labels: [
        'Repair', 'Food', 'Promotion'
    ],

};


class ExpenseChart extends Doughnut {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            options: props.options
        };
    };

    render() {
      return (
          <Doughnut
                data={this.state.data}
                options={this.state.options}
            />
        );
    };
};


export default ExpenseChart;
