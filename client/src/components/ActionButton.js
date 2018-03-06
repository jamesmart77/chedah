import React, {Component} from "react";
import { Button, Modal, Input } from "react-materialize";
import API from "../utils/API";



// materialize floating action button
class ActionButton extends Component {
  
  // https://react-materialize.github.io/#/buttons
  state =  {
    gigName: "",
    commands : [
    {
      title: 'Add Gig',
      icon: 'work',
      id: 'action-add-gig',
      color: 'teal darken-4',
      fn: this.addGig
    }, {
      title: 'Add Account',
      icon: 'account_balance',
      id: 'action-add-account',
      color: 'teal darken-3',
      fn: this.addAccount
    }, {
      title: 'Add Goal',
      icon: 'pie_chart',
      id: 'action-add-goal',
      color: 'teal darken-2',
      fn: this.addGoal
    }
  ]}

  addGig(){
    API.createGig(this.state.gigName)
      .then(console.log)
      .catch(console.log)
  }

  addAccount(){
    alert('called a function kitch')
    // API.createGig()
  }
  addGoal(){
    alert('Not sure this should happen here')
    // API.createGig()
  }

  handleChange = e => {
    const {name, value} = e.target
    this.setState({[name]: value})
  }

  addCommands(commands) {
      this.setState({commands: commands})
  }


  render() {
      const listItems = this.state.commands.map((command, i) =>
          <li key={i}>
                <Modal
                  header='Add A Gig'
                  actions={
                    <section>
                      <Button waves='light' flat className="modal-action modal-close deep-orange darken-3 white-text">Cancel</Button> &nbsp;
                      <Button waves='light' className="modal-action modal-close teal" onClick={ this.addGig.bind(this) } >Apply</Button>
                    </section>
                  }
                  trigger={<a href="#" id={command.id} className={"btn-floating " + command.color } onClick={command.fn}><i className="material-icons">{command.icon}</i></a>}>
                  <Input s={12} label="Gig Name" name="gigName" onChange = { this.handleChange } />
                </Modal>
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
