import React, { Component } from 'react'
import { connect } from 'react-redux'
import { history } from '../routers/history'
import moment from 'moment'
import { Container, Button } from 'reactstrap'
import { setCandidates } from '../actions/candidates'
import Candidate from './Candidate'

export class CandidateList extends Component {
  componentDidMount = () => {
    const { instance, setCandidates } = this.props
    setCandidates(instance)
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
      <Container className="mb-5">
        <Button
          onClick={this.handleCreateCandidate}
          color="info"
          block
          className="p-3"
        >
          Add a new Candidate
        </Button>
        {candidates.length !== 0 ? (
          candidates.map((candidate, i) => (
            <Candidate key={i} candidate={candidate} />
          ))
        ) : (
          <h2> No candidates added yet </h2>
        )}
      </Container>
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
