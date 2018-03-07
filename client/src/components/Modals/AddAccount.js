import React, { Component } from 'react';
import API from '../../utils/API';


// add account modal
class ModalAddAccount extends Component {

    constructor(props) {
        super(props);
        console.log(`Modal: `, props);
    }

    componentWillMount() {
        API.getGigData(this.props.accountId).then(accountData => {
            this.setState(accountData)
            console.log(`-> ModalAddAccount: `, accountData);
        }).catch(console.log)
    }

    render() {
        return (
                 <div id="add-account-modal" className="modal" data-modal style={{width: '60%', height: '40%'}}>
                   <div className="modal-content">
                     <h4>Add an Account</h4>

                     <div className="row">
                     <div className="col input-field s6">
                       <input type="text" name="accountName" id="input-account-name" />
                       <label className="active" htmlFor="input-account-name">Account Name</label>
                     </div>

                     <div className="col s6">
                         <div class="input-field">
                           <select>
                             <option value="" disabled selected>Account type</option>
                             <option value="1">Checking</option>
                             <option value="2">Credit Card</option>
                           </select>
                           <label>Account Type</label>
                         </div>
                     </div>
                     </div>

                     <div className="col input-field s12">
                       <input type="text" name="accountDescription" id="input-account-description"/>
                       <label className="active" htmlFor="input-account-description">Description</label>
                     </div>

                   </div>
                   <div className="modal-footer">
                     <section>
                       <button className="btn waves-effect waves-light btn-flat modal-action modal-close deep-orange darken-3 white-text">Cancel</button>
                       &nbsp;
                       <button className="btn waves-effect waves-light modal-action modal-close teal">Apply</button>
                     </section>
                   </div>
                 </div>
      );
    }
}

export default ModalAddAccount;
