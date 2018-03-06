import React, {Component} from "react";
import { Button } from "react-materialize";

// https://react-materialize.github.io/#/buttons
const defaultCommands = [
  {
    title: 'Add Gig',
    icon: 'work',
    id: 'action-add-gig',
    color: 'teal darken-4'
  }, {
    title: 'Add Account',
    icon: 'account_balance',
    id: 'action-add-account',
    color: 'teal darken-3'
  }, {
    title: 'Add Goal',
    icon: 'pie_chart',
    id: 'action-add-goal',
    color: 'teal darken-2'
  }
]


// materialize floating action button
class ActionButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      commands: props.commands || defaultCommands
    };
    // this.handleClick = this.handleClick.bind(this);
  };

  addCommands(commands) {
      this.setState({commands: commands})
  }


  render() {
      const listItems = this.state.commands.map((command, i) =>
          <li key={i}>
              <a href="#" id={command.id} className={"btn-floating " + command.color}><i className="material-icons">{command.icon}</i></a>
              <a href="#" id={command.id} className="btn-floating mobile-fab-tip">{command.title}</a>
          </li>
      )

      return (
          <div className="fixed-action-btn" style={{bottom:'24px', right:'24px'}}>
            <a className="btn-floating btn-large dashboard-action-btn"><i className="large material-icons">add</i></a>
              <ul className="main-actions">
                  {listItems}
              </ul>
          </div>
      )
  };
};

export default ActionButton;
