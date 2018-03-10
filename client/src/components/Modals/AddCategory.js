import React from 'react';
import API from '../../utils/API';
import { Input } from 'react-materialize'


// add category modal
class ModalAddCategory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({[event.target.name]: event.target.value});
    }

    componentDidUpdate() {
        // console.log(this.state);
    }

    componentDidMount() {
        // console.log(`modal mounted`);
    }

    componentWillUnmount() {
        // console.log(`modal dismounting`);
    }

    handleSubmit() {
        console.log(`adding category: `, this.state);
        API.createCategory(this.state)
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }

    render() {
        return (
                 <div id="add-category-modal" className="modal" data-modal style={{width: '60%', height: '60%'}}>
                   <div className="modal-content">
                       <div className="modal-title">
                           <h4>Add a Category</h4>
                       </div>
                     <div className="col input-field s12">
                       <input value={this.state.name} onChange={this.handleChange} type="text" name="name" id="input-category-name" />
                       <label className="active" htmlFor="input-category-name">Category Name</label>
                     </div>
                     <div className="col input-field s12">
                       <input value={this.state.description} onChange={this.handleChange} type="text" name="description" id="input-category-description"/>
                       <label className="active" htmlFor="input-category-description">Description</label>
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

export default ModalAddCategory;
