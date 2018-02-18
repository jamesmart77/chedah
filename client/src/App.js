import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Books from "./pages/Books";
import Landing from "./pages/Landing";
import Testing from "./pages/Testing";
import Login from "./pages/Login";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Callback from './components/Callback';
import { requireAuth } from './utils/AuthService';
import history from './utils/history';

const App = () =>
  <Router history={history}>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/books" component={Books} onEnter={requireAuth} />
        <Route exact path="/testing" component={Testing} onEnter={requireAuth} />
        <Route exact path="/books/:id" component={Detail} />
        <Route path="/callback" component={Callback} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>;

export default App;
