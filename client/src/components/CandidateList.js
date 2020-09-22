import React, { Component } from 'react'
import { connect } from 'react-redux'
import { history } from '../routers/history'
import moment from 'moment'
import { Container, Button, Alert } from 'reactstrap'
import { setCandidates } from '../actions/candidates'
import Candidate from './Candidate'

export class CandidateList extends Component {
  state = {
    visible: false,
    message: null
  }

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
      this.setState({ message: 'Election needs to be created first' })
      this.setState({ visible: true })
    }
  }

  onDissmiss = () => {
    this.setState({ visible: false })
    this.setState({ message: null })
  }
  render() {
    const { candidates } = this.props
    const { message, visible } = this.state
    return (
      <Container className="mb-5">
        {message && (
          <Alert
            color="danger"
            toggle={this.onDissmiss}
            isOpen={visible}
            className="p-3"
          >
            {message}
          </Alert>
        )}
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
          <h2 className="text-dark p-5 text-center">
            {' '}
            No candidates added yet{' '}
          </h2>
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
