import React, {Component} from 'react';
var createReactClass = require('create-react-class');
var ReactDOM = require('react-dom');

var chartData = {
  borderWidth: 1,
  datasets: [
    {
      label: 'Expense Breakdown',
      data: [
        825.00, 200.00, 500
      ],
      backgroundColor: ['#ff6f00', '#ffa040', '#c43e00']
    }
  ],

  labels: ['Repair', 'Food', 'Promotion']
};

class ExpenseChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expenses: props.expenses || [],
      data: props.data,
      options: props.options
    };
    console.log(`props:`);
    console.log(props);
  };

  render() {
    return (
        <div>
          {this.state.expenses.map(exp =>
              <p>{exp}</p>
          )}
        </div>
    );
  }
};

export default ExpenseChart;
