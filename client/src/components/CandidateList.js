import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { setCandidates } from '../actions/candidates'
import Candidate from './Candidate'

export class CandidateList extends Component {
  componentDidMount = () => {
    this.props.setCandidates()
  }
  render() {
    const { candidates } = this.props
    return (
      <div>
        <h1>Candidate Dashboard</h1>
        <Link to="/createcandidate">Create</Link>
        {candidates.length !== 0 ? (
          candidates.map((candidate, i) => (
            <Candidate key={i} candidate={candidate} />
          ))
        ) : (
          <h2> No candidates added yet </h2>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  web3: state.web3.web3,
  accounts: state.web3.accounts,
  instance: state.web3.instance,
  candidates: state.candidates
})

export default connect(mapStateToProps, { setCandidates })(CandidateList)
