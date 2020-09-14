import React, { Component } from 'react'
import { connect } from 'react-redux'
import { history } from '../routers/AppRouter'
import moment from 'moment'
import { setCandidates } from '../actions/candidates'
import Candidate from './Candidate'

export class CandidateList extends Component {
  componentDidMount = () => {
    this.props.setCandidates()
  }

  handleCreateCandidate = () => {
    const { votingDeadline } = this.props
    const currentTime = moment().valueOf()
    const difference = parseInt(votingDeadline) - Math.floor(currentTime / 1000)
    if (difference > 0) {
      history.push('/createcandidate')
    } else {
      alert('Election needs to be created first')
    }
  }
  render() {
    const { candidates } = this.props
    return (
      <div>
        <h1>Candidate Dashboard</h1>
        <button onClick={this.handleCreateCandidate}>Create</button>
        {candidates.length !== 0 ? (
          candidates.map((candidate, i) => (
            <Candidate key={i} candidate={candidate} />
          ))
        ) : (
          <h2> No candidates added yet </h2>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  web3: state.web3.web3,
  accounts: state.web3.accounts,
  instance: state.web3.instance,
  candidates: state.candidates,
  votingDeadline: state.elections.votingDeadline
})

export default connect(mapStateToProps, { setCandidates })(CandidateList)
