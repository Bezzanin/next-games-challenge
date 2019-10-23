import React, { Component } from "react";
import { NavLink } from "react-router-dom";

// Navigation Bar component
class Navigation extends Component {
  render() {
    return (
      <div className="Navbar">
        <NavLink to="/">Datalog Feed</NavLink>
        <NavLink to="/azure">Azure Status</NavLink>
      </div>
    );
  }
}

export default Navigation;
