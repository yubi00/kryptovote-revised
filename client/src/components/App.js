import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { history } from '../routers/AppRouter'

export class App extends Component {
  handleResults = async (e) => {
    e.preventDefault()

    const { instance } = this.props

    const status = await instance.methods.checkVotingStatus().call()

    if (status) {
      alert('You cannot view the results now')
    } else {
      history.push('/results')
    }
  }
  render() {
    const { isAuthenticated, web3 } = this.props
    if (!web3) return <div>Loading web3, accounts and contract instance...</div>
    return (
      <div>
        <h1>This is the main public page</h1>
        {!isAuthenticated && <h2>Login to your accout to get started</h2>}
        {isAuthenticated && <Link to="/vote">Vote here</Link>}
        {isAuthenticated && (
          <button onClick={this.handleResults}>View Results</button>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  web3: state.web3.web3,
  instance: state.web3.instance,
  votingDeadline: state.elections.votingDeadline
})

export default connect(mapStateToProps, undefined)(App)
