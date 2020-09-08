import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Election from './Election'
import { setElection } from '../actions/elections'

export class ElectionDashboard extends Component {
  componentDidMount = () => {
    this.props.setElection()
  }

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
  description: state.elections.electionDesc,
  instance: state.auth.instance
})

export default connect(mapStateToProps, { setElection })(ElectionDashboard)
