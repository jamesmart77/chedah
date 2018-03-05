import React from "react";
import { Router, Route, Switch } from "react-router-dom";
// import AccountDetail from "./pages/AccountDetail";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Nav from "./components/Nav";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";
import Callback from './components/Callback';
import { requireAuth } from './utils/AuthService';
import history from './utils/history';
import GigDetail from "./pages/GigDetail";
import ActionButton from './components/ActionButton';
import { AccountsHome, AccountDetail } from './pages/Accounts';


const App = () =>
  <Router history={history}>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/dashboard" component={Dashboard} onEnter={requireAuth} />
        <Route exact path="/gigs/:id" component={GigDetail} onEnter={requireAuth} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/accounts" component={AccountsHome} onEnter={requireAuth} />
        <Route exact path="/accounts/:id" component={AccountDetail} onEnter={requireAuth}  />
        <Route path="/callback" component={Callback} />
        {/* <Route component={NoMatch} /> */}
      </Switch>
      <Footer />
      <Sidebar />
      <ActionButton />
    </div>
  </Router>;

export default App;
