import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class NavBar extends Component {
  render() {
    return (
      <div>
        <nav>
          <Link to="/admindashboard">Dashboard</Link>
          <Link to="/election">Election</Link>
          <Link to="/candidate">Candidate</Link>
          <Link to="/voter">Voter</Link>
        </nav>
      </div>
    )
  }
}

export default NavBar
