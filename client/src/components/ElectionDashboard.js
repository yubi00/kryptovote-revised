import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Election from './Election'

export class ElectionDashboard extends Component {
  render() {
    const { electionName, votingDeadline, description } = this.props
    const election = { electionName, votingDeadline, description }
    return (
      <div>
        <h1>Election Dashboard </h1>
        <Link to="/createelection">Create</Link>
        <Election election={election} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  votingDeadline: state.elections.votingDeadline,
  electionName: state.elections.electionName,
  description: state.elections.description
})

export default connect(mapStateToProps, undefined)(ElectionDashboard)
