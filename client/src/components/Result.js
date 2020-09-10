import React, { Component } from 'react'
import { connect } from 'react-redux'
import Candidate from './Candidate'
import { setCandidates } from '../actions/candidates'

export class Result extends Component {
  componentDidMount = () => {
    this.props.setCandidates()
  }

  render() {
    const { candidates } = this.props
    return (
      <div>
        <h1>Result of the election</h1>
        {candidates &&
          candidates.map((candidate, i) => (
            <Candidate key={i} candidate={candidate} />
          ))}
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  candidates: state.candidates
})

export default connect(mapStateToProps, { setCandidates })(Result)
