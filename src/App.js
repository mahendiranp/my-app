import React from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";

import AddCart from "./views/AddCart";
import OrderSummary from "./views/OrderSummary";

import Headers from './component/Header'
import Footer from './component/Footer'

import "./App.scss";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
        <Headers />
          <Switch>
            <Route exact path="/" component={AddCart} />
            <Route exact path="/summary" component={OrderSummary} />
          </Switch>
        <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
