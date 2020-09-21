import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container, Collapse, Nav, Navbar, NavbarToggler } from 'reactstrap'
import '../styles/Nav.css'

export class NavBar extends Component {
  state = {
    isOpen: false
  }

  toggle = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }))
  }
  render() {
    const { isOpen } = this.state

    return (
      <Container className="mb-5">
        <Navbar color="dark" dark expand="lg" className="p-3">
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <Link to="/admindashboard" className="nav-link">
                Dashboard
              </Link>
              <Link to="/election" className="nav-link">
                Election
              </Link>
              <Link to="/candidate" className="nav-link">
                Candidate
              </Link>
              <Link to="/voter" className="nav-link">
                Voter
              </Link>
            </Nav>
          </Collapse>
        </Navbar>
      </Container>
    )
  }
}

export default NavBar
