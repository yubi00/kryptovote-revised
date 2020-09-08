import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class App extends Component {
  render() {
    return (
      <div>
        <h1>This is the main public page</h1>
        <h2>Login to your accout to get started</h2>
        <Link to="/vote">Vote here</Link>
      </div>
    )
  }
}

export default App
