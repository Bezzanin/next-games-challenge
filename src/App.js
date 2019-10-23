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
      <Router basename={process.env.PUBLIC_URL}>
        <>
          <Navigation />
          <Switch>
            <Route
              path={process.env.PUBLIC_URL + "/"}
              component={DatadogPage}
              exact
            />
            <Route
              path={process.env.PUBLIC_URL + "/azure"}
              component={AzurePage}
            />
            <Route component={ErrorPage} />
          </Switch>
        </>
      </Router>
    );
  }
}

export default App;
