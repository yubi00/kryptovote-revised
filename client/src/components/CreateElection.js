import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addElection } from '../actions/elections'
import { resetResults } from '../actions/results'
import { resetVoters } from '../actions/voters'
import { resetCandidates } from '../actions/candidates'
import { Redirect } from 'react-router-dom'
import Loader from './Loader'
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Button
} from 'reactstrap'

class CreateElection extends Component {
  state = {
    title: '',
    description: '',
    duration: '',
    message: '',
    toElection: false,
    loading: false,
    disabled: false,
    visible: false
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    this.setState({ disabled: true })
    const {
      web3,
      accounts,
      instance,
      addElection,
      resetResults,
      resetVoters,
      resetCandidates
    } = this.props

    //create an election and store in the blockchain
    const { title, duration, description } = this.state
    if (!title || !duration) {
      this.setState({ visible: true })
      return this.setState({
        message: 'Title and duration are both required'
      })
    }
    try {
      this.setState({ loading: true })
      await instance.methods
        .createElection(
          web3.utils.stringToHex(title),
          web3.utils.stringToHex(description),
          parseInt(duration)
        )
        .send({
          from: accounts[0],
          gas: 4000000,
          gasPrice: web3.utils.toWei('20', 'gwei')
        })
      const votingDeadline = await instance.methods.getVotingDeadline().call()
      const electionName = await instance.methods.getElectionName().call()
      const electionDesc = await instance.methods.getElectionDesc().call()
      addElection({
        electionName,
        electionDesc,
        votingDeadline
      })
      resetResults()
      resetVoters()
      resetCandidates()
      this.setState({ loading: false })
      this.setState({ toElection: true })
    } catch (error) {
      this.setState({ loading: false })
      this.setState({ disabled: false })
      this.setState({ message: error.message })
      this.setState({ visible: true })
    }
  }

  onChange = (e) => {
    this.setState({ disabled: false })
    this.setState({ message: '' })
    const value = e.target.value
    const name = e.target.name
    this.setState({
      [name]: value
    })
  }

  onDissmiss = () => {
    this.setState({ visible: false })
    this.setState({ message: null })
  }

  render() {
    const {
      title,
      description,
      duration,
      message,
      toElection,
      loading,
      disabled,
      visible
    } = this.state

    if (toElection) return <Redirect to="/election" />

    return (
      <Container className="mb-5">
        {message && (
          <Alert color="danger" isOpen={visible} toggle={this.onDissmiss}>
            {message}
          </Alert>
        )}
        <Form onSubmit={this.handleSubmit} className="border p-5">
          <FormGroup>
            <Label>Title</Label>
            <Input
              type="text"
              placeholder="election title"
              name="title"
              value={title}
              onChange={this.onChange}
              className="mb-3"
            />
            <Label>Description</Label>
            <Input
              placeholder="Description about the election"
              name="description"
              value={description}
              onChange={this.onChange}
              className="mb-3"
            ></Input>
            <label>Duration</label>
            <Input
              type="text"
              name="duration"
              placeholder="Duration of election in minutes "
              onChange={this.onChange}
              value={duration}
              className="mb-3"
            ></Input>
            <Button disabled={disabled}>{loading ? <Loader /> : 'Save'}</Button>
          </FormGroup>
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  web3: state.web3.web3,
  accounts: state.web3.accounts,
  instance: state.web3.instance
})

export default connect(mapStateToProps, {
  addElection,
  resetResults,
  resetVoters,
  resetCandidates
})(CreateElection)
