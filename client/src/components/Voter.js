import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadVoters } from '../actions/voters'

export class Voter extends Component {
  componentDidMount = () => {
    const { loadVoters, instance } = this.props
    loadVoters(instance)
  }

  render() {
    const { voters } = this.props
    return (
      <div>
        <h1>List of all the Voters</h1>
        {voters.length === 0 ? (
          <h2>No voters yet</h2>
        ) : (
          <div>
            <h2>{`Total number of voters:  ${voters.length} `}</h2>
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
  voters: state.voters,
  instance: state.web3.instance
})

export default connect(mapStateToProps, { loadVoters })(Voter)
