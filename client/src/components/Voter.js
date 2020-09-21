import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, ListGroup, ListGroupItem } from 'reactstrap'
import { loadVoters } from '../actions/voters'
import '../styles/List.css'

export class Voter extends Component {
  componentDidMount = () => {
    const { loadVoters, instance } = this.props
    loadVoters(instance)
  }

  render() {
    const { voters } = this.props
    return (
      <Container className="mb-5">
        {voters.length === 0 ? (
          <h2>No voters yet</h2>
        ) : (
          <ListGroup>
            <h3 className="mb-0 bg-info text-white p-3">{`Total number of voters:  ${voters.length} `}</h3>
            {voters.map((voter, i) => (
              <ListGroupItem key={i} className="list-item">
                {voter}
              </ListGroupItem>
            ))}
          </ListGroup>
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
