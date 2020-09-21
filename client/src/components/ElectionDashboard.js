import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import Election from './Election'
import { setElection } from '../actions/elections'
import { history } from '../routers/history'
import { Container, Button, Alert } from 'reactstrap'

export class ElectionDashboard extends Component {
  state = {
    message: null,
    visible: true
  }

  onDissmiss = () => {
    this.setState({ visible: false })
    this.setState({ message: null })
  }

  componentDidMount = () => {
    const { setElection, instance } = this.props
    setElection(instance)
  }

  handleResults = async (e) => {
    e.preventDefault()
    const { votingDeadline } = this.props

    const currentTime = moment().valueOf()
    const difference = parseInt(votingDeadline) - Math.floor(currentTime / 1000)
    this.setState({ difference })

    if (difference > 0) {
      this.setState({ message: 'Wait till the voting period ends' })
      this.setState({ visible: true })
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
      this.setState({ visible: true })
      this.setState({ message: 'Wait till the voting period ends' })
    } else {
      history.push('/createelection')
    }
  }

  render() {
    const { electionName, votingDeadline, description } = this.props
    const election = { electionName, votingDeadline, description }
    const { visible, message } = this.state
    return (
      <Container className="mb-5 d-flex justify-content-center align-items-center flex-column">
        {message && (
          <Alert color="danger" isOpen={visible} toggle={this.onDissmiss}>
            {message}
          </Alert>
        )}
        <div className="election-dashboard bg-info p-5">
          <Button
            onClick={this.handleCreateElection}
            block
            className="p-2 mb-3"
          >
            Create a new Election
          </Button>
          <Election election={election} />
          <Button onClick={this.handleResults} block>
            View Results
          </Button>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  votingDeadline: state.elections.votingDeadline,
  electionName: state.elections.electionName,
  description: state.elections.electionDesc,
  instance: state.web3.instance
})

export default connect(mapStateToProps, { setElection })(ElectionDashboard)
