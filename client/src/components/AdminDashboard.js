import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Row } from 'reactstrap'
import '../styles/App.css'

class AdminDashboard extends Component {
  render() {
    const { web3 } = this.props
    if (!web3) {
      return <div>Loading Web3, accounts, and contract...</div>
    }

    return (
      <Container className="mb-5">
        <Row>
          <img src="/img/adminguides.png" alt="" className="guide-img" />
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  web3: state.web3.web3
})

export default connect(mapStateToProps, undefined)(AdminDashboard)
