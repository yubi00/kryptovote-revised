import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import Candidate from './Candidate'
import { signTransaction } from '../utils/signTransaction'
import { addVoter } from '../actions/voters'
import { setElection } from '../actions/elections'
import { setCandidates } from '../actions/candidates'
import Loader from './Loader'

export class Vote extends Component {
  state = {
    selectedOption: '',
    loading: false,
    disabled: false
  }

  componentDidMount = () => {
    this.props.setElection()
    this.props.setCandidates()
  }

  setValue = (selectedOption) => {
    this.setState({ selectedOption })
  }

  submitVote = async (e) => {
    e.preventDefault()

    if (!this.state.selectedOption) {
      return alert('Choose your candidate to vote')
    }
    this.setState({ disabled: true })
    const { web3, uid, addVoter } = this.props
    try {
      this.setState({ loading: true })
      const { transactionHash, voterAddress } = await signTransaction(
        web3,
        uid,
        'vote(bytes32)',
        this.state.selectedOption
      )
      if (transactionHash) {
        alert('Voting successful')
        addVoter(voterAddress)

        this.setState({ loading: false })
        this.setState({ disabled: false })
      }
    } catch (error) {
      alert(error.message)
      this.setState({ loading: false })
    }
  }

  render() {
    const { candidates, votingDeadline, electionName } = this.props
    const { loading, disabled } = this.state
    return (
      <div>
        <h1>Cast vote to your favourite candidate</h1>
        {electionName && <h2>{electionName}</h2>}
        {votingDeadline !== 0 && electionName && (
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
        <button onClick={this.submitVote} disabled={disabled}>
          Cast Vote
        </button>
        <span>{loading && <Loader />}</span>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  candidates: state.candidates,
  votingDeadline: state.elections.votingDeadline,
  electionName: state.elections.electionName,
  uid: state.auth.user.uid,
  web3: state.web3.web3,
  instance: state.web3.instance,
  accounts: state.web3.accounts
})

export default connect(mapStateToProps, {
  setElection,
  setCandidates,
  addVoter
})(Vote)
