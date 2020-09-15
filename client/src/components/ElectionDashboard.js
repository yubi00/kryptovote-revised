import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import Election from './Election'
import { setElection } from '../actions/elections'
import { history } from '../routers/AppRouter'

export class ElectionDashboard extends Component {
  componentDidMount = () => {
    this.props.setElection()
  }

  handleResults = async (e) => {
    e.preventDefault()
    const { votingDeadline } = this.props

    const currentTime = moment().valueOf()
    const difference = parseInt(votingDeadline) - Math.floor(currentTime / 1000)
    this.setState({ difference })

    if (difference > 0) {
      alert('You cannot view result now')
    } else {
      history.push('/results')
    }
  }

  handleCreateElection = (e) => {
    e.preventDefault()
    const { votingDeadline } = this.props

    const currentTime = moment().valueOf()
    const difference = parseInt(votingDeadline) - Math.floor(currentTime / 1000)

    if (difference > 0) {
      alert('Wait till the current election ends')
    } else {
      history.push('/createelection')
    }
  }

  render() {
    const { electionName, votingDeadline, description } = this.props
    const election = { electionName, votingDeadline, description }

    return (
      <div>
        <h1>Election Dashboard </h1>
        <button onClick={this.handleCreateElection}>Create</button>
        <Election election={election} />
        <button onClick={this.handleResults}>View Results</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  votingDeadline: state.elections.votingDeadline,
  electionName: state.elections.electionName,
  description: state.elections.electionDesc
})

export default connect(mapStateToProps, { setElection })(ElectionDashboard)
