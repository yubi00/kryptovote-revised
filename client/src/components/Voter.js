import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadVoters } from '../actions/voters'

export class Voter extends Component {
  componentDidMount = () => {
    const { loadVoters } = this.props
    loadVoters()
  }

  render() {
    const { voters } = this.props
    return (
      <div>
        <h1>Voters Dashboard</h1>
        {voters && voters.map((voter, i) => <p key={i}>{voter}</p>)}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  voters: state.voters
})

export default connect(mapStateToProps, { loadVoters })(Voter)
