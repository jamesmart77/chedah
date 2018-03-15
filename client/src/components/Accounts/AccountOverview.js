import React from 'react';
// import CreditCardAPR from './APR'
// import  HeaderMenu from '../Dash/HeaderMenu';
import { Modal, Button, Row, Input } from 'react-materialize';
import API from '../../utils/API'


// account preview component (for accounts home)
class AccountOverview extends React.Component {

    constructor(props) {
        super(props)
    }


    deleteAccount(accountId) {
        API.deleteAccount(accountId)
          .then(res => this.props.refresh())
          .catch(err => console.log('err', err))
      }

    render() {
        // const iconName = (this.props.account.type === 'credit') ? 'credit_card' : 'attach_money'
        const iconName = (this.props.account.type == 'credit') ? 'icon-credit-card-1' : 'icon-banknote'
        const listItems = [{id: 1, name: 'edit account'}, {id: 2, name: 'add gig'}, {id: 3, name: 'remove account'}]
        return (
            <div key={this.props.account._id} className="card account-view-card">
                <div className="card-content">
                    <div className="row valign-wrapper">


                            <span className="card-title">
                                <span className={iconName}></span>
                                <a href={'/accounts/' + this.props.account.account_id}>  {this.props.account.name}</a>
                                
                            </span>

                            <div className="right">
                     <Modal
                        header="Edit Account"
                        trigger={<a href="!#"><i className="material-icons iconStyleMed">settings</i></a>}
                        actions={
                            <section className="modalSpace">
                            <Button  onClick={ () => this.deleteAccount(this.props.account.account_id) } waves='light' className="modal-action modal-close deep-orange darken-3 white-text" >Delete Account</Button> <Button waves='light' className="modal-action modal-close teal" >Update Account</Button> 
                            </section>
                          }>

                          <div className='col input-field s12'>
                            <input className='input-field' onChange={this.handleChange} type='text' name='name' id='input_1' defaultValue={ this.props.name } />
                            <label className='active' htmlFor='input_1'> Account Name </label>
                          </div>

                          <div className='col input-field s12'>
                            <input className='input-field' onChange={this.handleChange} type='text' name='description' id='input_2' defaultValue={ this.props.description } />
                            <label className='active' htmlFor='input_2'> Account Description </label>
                          </div>

                            <br/>
                            <br/>
                            <br/>

                        </Modal> 
                    </div>
                </div>
                </div>
                </div>
        )
    }
}

export default AccountOverview;
