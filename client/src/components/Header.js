import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import Register from './Register'
import Login from './Login'
import { logout } from '../actions/auth'
import { clearErrors } from '../actions/errors'
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
import '../styles/Header.css'

function Header({ logout, admin, isAuthenticated, user, clearErrors }) {
  const [isRegisterModalOpen, setRegisterModal] = useState(false)
  const [isLoginModalOpen, setLoginModal] = useState(false)
  const [isOpen, setOpen] = useState(false)

  const toggle = () => setOpen(!isOpen)
  const toggleRegister = () => {
    clearErrors()
    setRegisterModal(!isRegisterModalOpen)
  }
  const toggleLogin = () => {
    clearErrors()
    setLoginModal(!isLoginModalOpen)
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
        <NavLink onClick={toggleRegister} className="nav-link">
          Register
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink onClick={toggleLogin} className="nav-link">
          Login
        </NavLink>
      </NavItem>
    </Fragment>
  )

  return (
    <header>
      <Navbar color="dark" dark expand="md">
        <Container>
          <Link to="/">
            <img src="/img/logo.png" alt="" height="70px" />
          </Link>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav navbar>{!isAuthenticated ? AuthLinks : GuestLinks}</Nav>
          </Collapse>
          <Register
            isModalOpen={isRegisterModalOpen}
            toggle={toggleRegister}
            toggleLogin={toggleLogin}
          />
          <Login isModalOpen={isLoginModalOpen} toggle={toggleLogin} />
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

export default connect(mapStateToProps, { logout, clearErrors })(Header)
