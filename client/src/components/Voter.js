import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'
import { loadVoters } from '../actions/voters'

export class Voter extends Component {
  componentDidMount = () => {
    const { loadVoters, instance } = this.props
    loadVoters(instance)
  }

  render() {
    const { voters } = this.props
    return (
      <Container>
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
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  voters: state.voters,
  instance: state.web3.instance
})

export default connect(mapStateToProps, { loadVoters })(Voter)
