import React, { Component } from 'react';
import API from '../../utils/API';
//const $ = require('jquery');
import { Input } from 'react-materialize'


console.log(API.addGig);
// add gig modal
class ModalAddGig extends Component {



    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getAccountList() {
        const accountList = this.props.user.accounts.map(acct =>
            <option key={acct._id}>{acct.name}</option>
        )
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({[event.target.name]: event.target.value});

    }

    componentDidUpdate() {
        console.log(this.state);
    }

    handleSubmit() {
        console.log(`adding gig: `, this.state);
        API.addGig(this.state)
    }

    render() {
        const accounts = this.props.user.accounts || []
        let accountList = accounts.map(acct =>
            <option key={acct.account_id}>{acct.name}</option>
        )
        accountList.unshift(<option key={0} disabled>None</option>)

        return (
                 <div id="add-gig-modal" className="modal" data-modal style={{width: '60%', height: '40%'}}>
                   <div className="modal-content">
                     <h4>Add a Gig</h4>
                     <div className="col input-field s12">
                       <input value={this.state.name} onChange={this.handleChange} type="text" name="name" id="input-gig-name" />
                       <label className="active" htmlFor="input-gig-name">Gig Name</label>
                     </div>
                     <div className="col input-field s12">
                       <input value={this.state.description} onChange={this.handleChange} type="text" name="description" id="input-gig-description"/>
                       <label className="active" htmlFor="input-gig-description">Description</label>
                     </div>
                     {/* Accounts */}
                     <div className="row">
                       <div className="input-field col s6">
                         <Input s={12} type='select' id="input-gig-account" label="Associate with Account" defaultValue="None" onBlur={this.onChange}>
                           {accountList}
                         </Input>
                       </div>
                     </div>
                   </div>
                   <div className="modal-footer">
                     <section>
                       <button className="btn waves-effect waves-light btn-flat modal-action modal-close deep-orange darken-3 white-text">Cancel</button>
                       &nbsp;
                       <button onClick={this.handleSubmit} className="btn waves-effect waves-light modal-action modal-close teal">Apply</button>
                     </section>
                   </div>
                 </div>
        );
    }
}

export default ModalAddGig;
