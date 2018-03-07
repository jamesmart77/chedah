import React, {Component} from 'react';
import './Breadcrumbs.css';

// navigation breadcrumbs
class Breadcrumbs extends Component {

    constructor(props) {
        super(props);

        this.state = {
            path: '/Home'
        }
    }

    render() {
        return (
            <nav className="breadcrumbs">
                <div className="nav-wrapper breadcrumbs-wrapper">
                    <div className="breadcrumbs col s12">
                        <a href="#!" className="breadcrumb">Home</a>
                        <a href="#!" className="breadcrumb">Accounts</a>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Breadcrumbs;
