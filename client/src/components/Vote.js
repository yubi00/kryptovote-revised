import React, { Component } from 'react'
import { connect } from 'react-redux'
import Candidate from './Candidate'
import { signTransaction } from '../utils/signTransaction'
import { addVoter } from '../actions/voters'
import { setElection } from '../actions/elections'
import { setCandidates } from '../actions/candidates'
import Loader from './Loader'
import { Container, Button } from 'reactstrap'
import '../styles/Election.css'

export class Vote extends Component {
  state = {
    selectedOption: '',
    loading: false,
    disabled: false
  }

  componentDidMount = () => {
    this.props.setElection(this.props.instance)
    this.props.setCandidates(this.props.instance)
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
      this.setState({ disabled: false })
    }
  }

  render() {
    const { candidates, electionName } = this.props
    const { loading, disabled } = this.state
    return (
      <Container className="mb-5">
        <div className="election-info">
          {electionName && <h1 className="election-title">{electionName}</h1>}
        </div>

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
        <Button
          onClick={this.submitVote}
          disabled={disabled}
          color="primary"
          block
          size="lg"
        >
          {loading ? <Loader /> : 'Cast Vote'}
        </Button>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  candidates: state.candidates,
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
