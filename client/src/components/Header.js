import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import Register from './Register'
import Login from './Login'
import { logout } from '../actions/auth'
import NavBar from './NavBar'
import Counter from './Counter'
import { Link } from 'react-router-dom'
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavLink,
  NavItem
} from 'reactstrap'

function Header({ logout, admin, isAuthenticated, user }) {
  const [isRegisterModalOpen, setRegisterModal] = useState(false)
  const [isLoginModalOpen, setLoginModal] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  const handleLoginCloseModal = () => {
    setLoginModal(false)
  }

  const handleRegisterCloseModal = () => {
    setRegisterModal(false)
  }
  const GuestLinks = (
    <Fragment>
      <NavItem>
        <span className="navbar-text mr-3">
          {user ? `Welcome ${user.email}` : ''}
        </span>
      </NavItem>
      <NavItem>
        <NavLink onClick={logout}>Logout</NavLink>
      </NavItem>
    </Fragment>
  )

  const AuthLinks = (
    <Fragment>
      <NavItem>
        <NavLink onClick={(e) => setRegisterModal(true)}>Register</NavLink>
      </NavItem>
      <NavItem>
        <NavLink onClick={(e) => setLoginModal(true)}>Login</NavLink>
      </NavItem>
    </Fragment>
  )

  return (
    <header>
      <Navbar color="dark" dark expand="sm">
        <Container>
          <Link to="/">
            <img src="/img/logo.png" alt="" height="70px" />
          </Link>
          <NavbarToggler onClick={toggle} />

          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {!isAuthenticated ? AuthLinks : GuestLinks}
            </Nav>
          </Collapse>

          <Login
            isModalOpen={isLoginModalOpen}
            closeModal={handleLoginCloseModal}
          />
          <Register
            isModalOpen={isRegisterModalOpen}
            closeModal={handleRegisterCloseModal}
          />
        </Container>
      </Navbar>
      <Counter />
      {isAuthenticated && admin && <NavBar />}
    </header>
  )
}
const mapStateToProps = (state) => ({
  admin: state.auth.admin,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
})

export default connect(mapStateToProps, { logout })(Header)
