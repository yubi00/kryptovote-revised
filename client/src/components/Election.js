import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export class Election extends Component {
  render() {
    const { electionName, votingDeadline, description } = this.props
    return (
      <div>
        <h1>Election Dashboard </h1>
        <Link to="/createelection">Create</Link>
        {electionName && <p>{electionName}</p>}
        {description && <p>{description}</p>}
        {votingDeadline && (
          <p>{moment.unix(votingDeadline).format('h:mm:ss a')}</p>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  votingDeadline: state.elections.votingDeadline,
  electionName: state.elections.electionName,
  description: state.elections.description
})

export default connect(mapStateToProps, undefined)(Election)
