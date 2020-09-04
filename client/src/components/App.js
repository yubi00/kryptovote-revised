import React, { Component } from 'react'
import { connect } from 'react-redux'

class App extends Component {
  render() {
    const { web3, accounts } = this.props
    if (!web3) {
      return <div>Loading Web3, accounts, and contract...</div>
    }

    return (
      <div className="App">
        <h1>Kryptovote Coming Soon...</h1>
        <h2>Here are all the accounts</h2>
        {accounts && accounts.map((account) => <p key={account}>{account}</p>)}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  web3: state.web3.web3,
  accounts: state.web3.accounts
})

export default connect(mapStateToProps, undefined)(App)
