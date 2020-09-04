import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export class Candidate extends Component {
  render() {
    return (
      <div>
        <h1>Candidate Dashboard</h1>
        <Link to="/createcandidate">Create</Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  web3: state.web3.web3,
  accounts: state.web3.accounts,
  instance: state.web3.instance
})

export default connect(mapStateToProps, undefined)(Candidate)
