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
        {voters.length === 0 ? (
          <h2>No voters yet</h2>
        ) : (
          <div>
            <h2>{`There are currently ${voters.length} voters`}</h2>
            {voters.map((voter, i) => (
              <p key={i}>{voter}</p>
            ))}
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  voters: state.voters
})

export default connect(mapStateToProps, { loadVoters })(Voter)
