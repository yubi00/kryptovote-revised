import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'
import Candidate from './Candidate'
import { setResults } from '../actions/results'
import { getWinner } from '../actions/results'
import '../styles/Election.css'

export class Result extends Component {
  componentDidMount = async () => {
    const { setResults, getWinner, instance } = this.props

    setResults(instance, this.props.candidates)
    getWinner(instance)
  }

  render() {
    const { results } = this.props

    return (
      <Container className="mb-5">
        {results.winnerName && (
          <h1 className="election-title mb-0">{`Congrats ${results.winnerName}`}</h1>
        )}
        {results.candidates &&
          results.candidates.map((candidate, i) => (
            <Candidate key={i} candidate={candidate} />
          ))}
      </Container>
    )
  }
}
const mapStateToProps = (state) => ({
  candidates: state.candidates,
  results: state.results,
  instance: state.web3.instance
})

export default connect(mapStateToProps, {
  setResults,
  getWinner
})(Result)
