import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Election from './Election'
import { setElection } from '../actions/elections'
import { history } from '../routers/AppRouter'

export class ElectionDashboard extends Component {
  state = {
    disabled: false
  }
  componentDidMount = () => {
    this.props.setElection()
    this.showResult()
  }

  showResult = () => {
    const { votingDeadline } = this.props
    const currentTime = moment().valueOf()
    const difference = parseInt(votingDeadline) - Math.floor(currentTime / 1000)
    if (difference > 0) {
      this.setState({ disabled: true })
    } else {
      this.setState({ disabled: false })
    }
  }

  handleResults = async (e) => {
    e.preventDefault()
    history.push('/results')
  }

  render() {
    const { electionName, votingDeadline, description } = this.props
    const { disabled } = this.state
    const election = { electionName, votingDeadline, description }

    return (
      <div>
        <h1>Election Dashboard </h1>
        <Link to="/createelection">Create</Link>
        <Election election={election} />
        <button onClick={this.handleResults} disabled={disabled}>
          View Results
        </button>
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
