import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { history } from '../routers/AppRouter'
import moment from 'moment'

export class App extends Component {
  state = {
    disabled: false
  }

  componentDidMount = () => {
    this.showResult()
  }

  showResult = () => {
    const { votingDeadline } = this.props
    const currentTime = moment().valueOf()
    const difference = parseInt(votingDeadline) - Math.floor(currentTime / 1000)
    if (difference > 0) {
      this.setState({ disabled: true })
    } else {
      this.setState({ disabled: false })
    }
  }

  handleResults = async (e) => {
    e.preventDefault()
    history.push('/results')
  }

  render() {
    const { isAuthenticated, web3 } = this.props
    const { disabled } = this.state
    if (!web3) return <div>Loading web3, accounts and contract instance...</div>
    return (
      <div>
        <h1>This is the main public page</h1>
        {!isAuthenticated && <h2>Login to your accout to get started</h2>}
        {isAuthenticated && <Link to="/vote">Vote here</Link>}
        {isAuthenticated && (
          <button onClick={this.handleResults} disabled={disabled}>
            View Results
          </button>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  web3: state.web3.web3,
  votingDeadline: state.elections.votingDeadline
})

export default connect(mapStateToProps, undefined)(App)
