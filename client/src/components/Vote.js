import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import Candidate from './Candidate'
import { signTransaction } from '../utils/signTransaction'
import { setElection } from '../actions/elections'

export class Vote extends Component {
  state = {
    selectedOption: ''
  }
  componentDidMount = () => {
    this.props.setElection()
  }

  setValue = (selectedOption) => {
    this.setState({ selectedOption })
  }

  submitVote = async (e) => {
    e.preventDefault()
    console.log(`submitting vote for ${this.state.selectedOption}`)

    try {
      const tx = await signTransaction(
        this.props.email,
        'vote(bytes32)',
        this.state.selectedOption
      )
      if (tx) {
        alert('Voting successful')
      }
    } catch (error) {
      alert(error.message)
    }
  }

  render() {
    const { candidates, votingDeadline, electionName } = this.props
    return (
      <div>
        <h1>Cast vote to your favourite candidate</h1>
        {electionName && <h2>{electionName}</h2>}
        {votingDeadline && electionName && (
          <h2>
            Voting Deadline:
            {moment.unix(votingDeadline).format('MMM Do YY, h:mm:ss a')}
          </h2>
        )}

        {candidates ? (
          candidates.map((candidate, i) => {
            return (
              <Candidate
                candidate={candidate}
                key={i}
                selectedOption={this.state.selectedOption}
                setValue={this.setValue}
              />
            )
          })
        ) : (
          <h2>No candidates added yet</h2>
        )}
        <button onClick={this.submitVote}>Cast Vote</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  candidates: state.candidates,
  votingDeadline: state.elections.votingDeadline,
  electionName: state.elections.electionName,
  email: state.auth.user.email
})

export default connect(mapStateToProps, { setElection })(Vote)
