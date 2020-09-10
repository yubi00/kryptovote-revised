import React, { Component } from 'react'
import { connect } from 'react-redux'
import Candidate from './Candidate'
import { setCandidates } from '../actions/candidates'
import { getWinner } from '../actions/winner'

export class Result extends Component {
  state = {
    winnerName: ''
  }

  componentDidMount = async () => {
    this.props.setCandidates()
    this.props.getWinner()
  }

  render() {
    const { candidates, winner } = this.props
    return (
      <div>
        <h1>Result of the election</h1>
        {winner && <h1>{`Congrats ${winner}`}</h1>}
        {candidates &&
          candidates.map((candidate, i) => (
            <Candidate key={i} candidate={candidate} />
          ))}
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  candidates: state.candidates,
  winner: state.winner.winnerName
})

export default connect(mapStateToProps, { setCandidates, getWinner })(Result)
