import React from "react";
import { login, logout, isLoggedIn } from '../../utils/AuthService';
import { Link } from "react-router-dom";
import API from '../../utils/API';
import { Button } from "react-materialize";
import axios from "axios";
import PlaidAccountLink from "../PlaidAccountLink"


// materialize navbar
const Nav = () => (
    <header>
        <nav className="navbar deep-orange darken-2">

            {/* <!-- Main Menu (Desktop Dropdown) --> */}
            <ul id="desktop-main-menu" className="dropdown-content">
                <li><a href="/accounts"><i className="large material-icons">account_balance</i>Accounts</a></li>
                <li><a href="#!"><i className="large material-icons">work</i>Gigs</a></li>
                <li><a href="#!"><i className="large material-icons">insert_chart</i>Goals</a></li>
                {/* if you get a jwt-auth error, navigate to the API.accountsSync function and comment out the function body until you login */}
                <li className="divider"></li>
                <li><a href="#!" onClick={() => API.accountsSync()}><i className="large material-icons">sync</i>Sync Accounts</a></li>
                <li className="divider"></li>
                <PlaidAccountLink><i className="large material-icons">insert_chart</i>Link Account</PlaidAccountLink>
                <li className="divider"></li>
                <li><a href="#!" onClick={() => logout()}><i className="large material-icons">keyboard_tab</i>Log Out</a></li>
                <li className="divider"></li>
            </ul>

            {/* <!-- Main Menu (Mobile Hamburger) --> */}
            <ul id="mobile-main-menu" className="side-nav">
                <li><a href="/accounts"><i className="large material-icons">account_balance</i>Accounts</a></li>
                <li><a href="#!"><i className="large material-icons">work</i>Gigs</a></li>
                <li><a href="#!"><i className="large material-icons">insert_chart</i>Goals</a></li>
                <li><div className="divider"></div></li>
                <li><a href="#!"><i className="large material-icons">sync</i>Sync Accounts</a></li>
                <li><div className="divider"></div></li>
                <PlaidAccountLink><i className="large material-icons">insert_chart</i>Link Account</PlaidAccountLink>
                <li className="divider"></li>
                <li><a href="#!" onClick={() => logout()}><i className="large material-icons">keyboard_tab</i>Log Out</a></li>
            </ul>

            {/* <!-- Navigation Bar --> */}
            <div className="nav-wrapper">
                <a href="/dashboard" className="brand-logo header-logo"><img src="/assets/img/icon-24x24.svg"/> chedah</a>
                {/* <!-- Hamburger Menu Icon --> */}
                <a href="#" data-activates="mobile-main-menu" className="button-collapse"><i className="material-icons">menu</i></a>
                {(isLoggedIn()) ?
                <ul className="right topnav-menu">
                    <li><a className="dropdown-button hide-on-med-and-down" href="#!" data-activates="desktop-main-menu">Menu<i className="material-icons right">arrow_drop_down</i></a></li>
                    <li><a href="#" data-activates="user-slideout" className="waves-effect waves-block waves-light user-side-collapse"><i className="material-icons">input</i></a></li>
                </ul>
                :
                <ul className="right topnav-menu">
                <li><a href="#!" onClick={() => login()}>Log In</a></li>
                </ul>
            }
            </div>
        </nav>
    </header>
    )


export default Nav;
