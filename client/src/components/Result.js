import React, { Component } from 'react'
import { connect } from 'react-redux'
import Candidate from './Candidate'
import { setResults } from '../actions/results'
import { setCandidates } from '../actions/candidates'
import { getWinner } from '../actions/results'

export class Result extends Component {
  componentDidMount = async () => {
    const { setCandidates, setResults, getWinner } = this.props
    setCandidates()
    setResults(this.props.candidates)
    getWinner()
  }

  render() {
    const { results } = this.props

    return (
      <div>
        <h1>Result of the election</h1>
        {results.winnerName && <h1>{`Congrats ${results.winnerName}`}</h1>}
        {results.candidates &&
          results.candidates.map((candidate, i) => (
            <Candidate key={i} candidate={candidate} />
          ))}
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  candidates: state.candidates,
  results: state.results
})

export default connect(mapStateToProps, {
  setResults,
  getWinner,
  setCandidates
})(Result)
