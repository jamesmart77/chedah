import React, { Component } from 'react';
import { login, isLoggedIn } from '../../utils/AuthService';
import MainMenu from './MainMenu';


// materialize navbar
class Nav extends Component {

    constructor(props) {
        super(props)
        console.log(`nav: `, props);
    }

    render() {
        return (
            <header>
                <nav className="navbar deep-orange darken-2">

                    {/* <!-- Navigation Bar --> */}
                    <div className="nav-wrapper">
                        <a href="/dashboard" className="brand-logo header-logo"><img src="/assets/img/icon-24x24.svg" alt='chedah'/> chedah</a>
                        <MainMenu user={this.props.user}/>
                        {(isLoggedIn()) ?
                        <div>
                                {/* <!-- Hamburger Menu Icon --> */}
                            <a href="#!" data-activates="mobile-main-menu" className="button-collapse"><i className="material-icons">menu</i></a>
                        
                            <ul className="right topnav-menu">
                                <li><a className="dropdown-button hide-on-med-and-down" href="#!" data-activates="desktop-main-menu">Menu<i className="material-icons right">arrow_drop_down</i></a></li>
                                <li><a href="#" data-activates="user-slideout" className="waves-effect waves-block waves-light user-side-collapse"><i className="material-icons">input</i></a></li>
                            </ul>
                        </div>
                        :
                        <ul className="right topnav-menu">
                            <li><a href="#!" onClick={() => login()}>Log In</a></li>
                        </ul>}

                    </div>
                 </nav>
             </header>
    )}}

export default Nav;
