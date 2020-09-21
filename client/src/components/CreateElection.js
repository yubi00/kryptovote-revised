import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addElection } from '../actions/elections'
import { resetResults } from '../actions/results'
import { resetVoters } from '../actions/voters'
import { resetCandidates } from '../actions/candidates'
import { Redirect } from 'react-router-dom'
import Loader from './Loader'

class CreateElection extends Component {
  state = {
    title: '',
    description: '',
    duration: '',
    message: '',
    toElection: false,
    loading: false,
    disabled: false
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
      return this.setState({
        message: 'Please provide both title and duration'
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
      alert(error.message)
    }
  }

  onChange = (e) => {
    this.setState({ message: '' })
    const value = e.target.value
    const name = e.target.name
    this.setState({
      [name]: value
    })
  }

  render() {
    const {
      title,
      description,
      duration,
      message,
      toElection,
      loading,
      disabled
    } = this.state

    if (toElection) return <Redirect to="/election" />

    return (
      <div>
        <h1>Add Election</h1>
        {message && <h2>{message}</h2>}
        <form onSubmit={this.handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            placeholder="election title"
            name="title"
            value={title}
            onChange={this.onChange}
          />
          <label>Description</label>
          <textarea
            placeholder="Description about the election"
            name="description"
            value={description}
            onChange={this.onChange}
          ></textarea>
          <label>Duration</label>
          <input
            type="text"
            name="duration"
            placeholder="Duration of election in minutes "
            onChange={this.onChange}
            value={duration}
          ></input>
          <button disabled={disabled}>Save</button>
          <div>{loading && <Loader />}</div>
        </form>
      </div>
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
