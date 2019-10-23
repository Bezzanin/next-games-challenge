import React, { Component } from "react";
import "./App.css";
import DatadogPage from "./pages/DatadogPage";
import AzurePage from "./pages/AzurePage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Navigation from "./components/Navigation";

class App extends Component {
  render() {
    return (
      <Router>
        <>
          <Navigation />
          <Switch>
            <Route path="/" component={DatadogPage} exact />
            <Route path="/azure" component={AzurePage} />
            <Route component={ErrorPage} />
          </Switch>
        </>
      </Router>
    );
  }
}

export default App;
