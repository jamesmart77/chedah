import React from 'react';
import { Modal, Button, Row, Input } from 'react-materialize';

// dropdown menu for account overview
class HeaderMenu extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            id: props.id,
            uid: 'dropdown-menu',
            items: props.items || []
        }
    }

    // handleClick(item) {
    //     console.log(`-> item clicked: `, item);
    // }

    render() {
        // const trigger = (this.state.uid + '-' + this.state.id);
        // console.log(`trigger: `, trigger);
        // const listItems = this.state.items.map(item  =>
        //     <li key={item.id}><a href="#!" onClick={this.handleClick.bind(this, item.name)}>{item.name}</a></li>
        // )

        return (
            <div className="col right">
            <Modal
                        header="Edit Gig"
                        trigger={<a href="!#"><i className="material-icons iconStyleMed">settings</i></a>}
                        actions={
                            <section className="modalSpace">
                            <Button onClick={ () => this.deleteAccount(this.props._id) } waves='light' className="modal-action modal-close deep-orange darken-3 white-text" >Delete Account</Button> <Button onClick={this.editAccount.bind(this)} waves='light' className="modal-action modal-close teal" >Update Account</Button> 
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

                        </Modal> }
                {/* <a className="dropdown-button account-actions" href=""><i className="material-icons iconStyleMed">settings</i></a> */}
                    {/* <ul id={trigger} className="dropdown-content">
                        {listItems}
                    </ul> */}
            </div>
        )
    }
}


export default HeaderMenu;
