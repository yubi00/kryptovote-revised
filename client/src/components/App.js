import React, { Component } from 'react'
import { connect } from 'react-redux'
import { history } from '../routers/history'
import moment from 'moment'
import '../styles/App.css'
import { Container, Row, Col, Alert } from 'reactstrap'
import Loader from './Loader'
import Option from './Option'
import '../styles/App.css'

export class App extends Component {
  state = {
    message: null,
    dismiss: true
  }

  handleResults = async (e) => {
    e.preventDefault()
    const { instance } = this.props
    try {
      const votingDeadline = await instance.methods.getVotingDeadline().call()
      const currentTime = moment().valueOf()
      const difference =
        parseInt(votingDeadline) - Math.floor(currentTime / 1000)
      this.setState({ difference })

      if (difference > 0) {
        this.setState({ message: 'Wait till the voting period ends' })
        this.setState({ visible: true })
      } else {
        history.push('/results')
      }
    } catch (error) {
      return
    }
  }

  handleGuide = (e) => {
    e.preventDefault()
    history.push('/guide')
  }

  handleVoting = (e) => {
    e.preventDefault()
    history.push('/vote')
  }

  onDissmiss = () => {
    this.setState({ visible: false })
    this.setState({ message: null })
  }

  render() {
    const { isAuthenticated, web3, instance } = this.props
    const { message, visible } = this.state
    if (!web3 || !instance)
      return (
        <Container className="text-center text-dark d-flex flex-column justify-content-center align-items-center mb-5 p-5">
          <Loader />
          <div>Loading web3 abd contract instance...</div>
        </Container>
      )
    return (
      <div>
        <Container>
          {message && (
            <Alert
              className="p-3"
              color="danger"
              isOpen={visible}
              toggle={this.onDissmiss}
            >
              {message}
            </Alert>
          )}
          <Row>
            <Col xl="4">
              <Option
                buttonLabel="Guide"
                title="How to Vote"
                subtitle="Steps to voting"
                text="Click the button below to get started to the voting process of the kryptovote system"
                img="/img/voting.jpg"
                handleClick={this.handleGuide}
                disabled={false}
              />
            </Col>
            <Col xl="4">
              <Option
                buttonLabel="Vote here"
                title="Vote here"
                subtitle="voting ballot"
                text="Click the button below to cast vote to your favourtie candidate within voting period"
                img="/img/votingprocess.jpg"
                handleClick={this.handleVoting}
                disabled={!isAuthenticated ? true : false}
              />
            </Col>
            <Col xl="4">
              <Option
                buttonLabel="View Result"
                title="Election result"
                subtitle="result of the election"
                text="Click the button below to view the result of election after voting period ends"
                img="/img/result.jpg"
                handleClick={this.handleResults}
                disabled={!isAuthenticated ? true : false}
              />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  web3: state.web3.web3,
  instance: state.web3.instance
})

export default connect(mapStateToProps, undefined)(App)
