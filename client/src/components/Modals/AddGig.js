import React, { Component } from 'react';
import API from '../../utils/API';


// add gig modal
class ModalAddGig extends Component {

    constructor(props) {
        super(props);
        console.log(`Modal: `, props);
    }

    componentWillMount() {
        API.getGigData(this.props.gigId).then(gigData => {
            this.setState(gigData)
            console.log(`-> ModalAddGoal: `, gigData);
        }).catch(console.log)
    }

    render() {
        return (
                 <div id="add-gig-modal" className="modal" data-modal style={{width: '60%', height: '40%'}}>
                   <div className="modal-content">
                     <h4>Add a Gig</h4>
                     <div className="col input-field s12">
                       <input type="text" name="gigName" id="input-gig-name" />
                       <label className="active" htmlFor="input-gig-name">Gig Name</label>
                     </div>
                     <div className="col input-field s12">
                       <input type="text" name="gigDescription" id="input-gig-description"/>
                       <label className="active" htmlFor="input-gig-description">Description</label>
                     </div>
                     {/* Accounts */}
                     <div className="row">
                       <div className="input-field col s6">
                         <select>
                           <option value disabled defaultValue="None">None</option>
                           <option value={1}>Checking</option>
                           <option value={2}>Citi Mastercard</option>
                           <option value={3}>Chase Visa</option>
                         </select>
                         <label>Associate with Account</label>
                       </div>
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

export default ModalAddGig;
