import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setElection } from '../actions/elections'

class CreateElection extends Component {
  state = {
    title: '',
    description: '',
    duration: '',
    message: ''
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { web3, accounts, instance } = this.props

    //create an election and store in the blockchain
    const { title, duration } = this.state
    if (!title || !duration) {
      return this.setState({
        message: 'Please provide both title and duration'
      })
    }
    const isallowed = await instance.methods.isAllowed().call()
    if (isallowed) {
      return this.setState({
        message: 'Please wait till the voting period ends'
      })
    }

    try {
      await instance.methods
        .createElection(web3.utils.stringToHex(title), parseInt(duration))
        .send({ from: accounts[0] })

      const electionName = await instance.methods.getElectionName().call()
      const votingDeadline = await instance.methods.getVotingDeadline().call()
      this.props.setElection(
        electionName,
        votingDeadline,
        this.state.description
      )
      this.props.history.push('/election')
    } catch (error) {
      console.log(error.message)
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
    const { title, description, duration, message } = this.state
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
          <button>Save</button>
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

export default connect(mapStateToProps, { setElection })(CreateElection)
