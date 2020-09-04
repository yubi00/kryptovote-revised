import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div>
      <h1> Kryptovote </h1>
      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/election">Election</Link>
        <Link to="/candidate">Candidate</Link>
        <Link to="/voter">Voter</Link>
      </nav>
    </div>
  )
}

export default Header
