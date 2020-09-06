import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Register from './Register'
import Login from './Login'
import { logout } from '../actions/auth'
import NavBar from './NavBar'

function Header({ logout, admin, isAuthenticated }) {
  const [isRegisterModalOpen, setRegisterModal] = useState(false)
  const [isLoginModalOpen, setLoginModal] = useState(false)

  const handleLoginCloseModal = () => {
    setLoginModal(false)
  }

  const handleRegisterCloseModal = () => {
    setRegisterModal(false)
  }

  return (
    <div>
      <Link to="/">
        <h1> Kryptovote </h1>
      </Link>
      {!isAuthenticated ? (
        <div>
          <button onClick={(e) => setRegisterModal(true)}>Register</button>
          <button onClick={(e) => setLoginModal(true)}>Login</button>
        </div>
      ) : (
        <button onClick={logout}>Logout</button>
      )}

      <Login
        isModalOpen={isLoginModalOpen}
        closeModal={handleLoginCloseModal}
      />
      <Register
        isModalOpen={isRegisterModalOpen}
        closeModal={handleRegisterCloseModal}
      />
      {isAuthenticated && admin && <NavBar />}
    </div>
  )
}
const mapStateToProps = (state) => ({
  admin: state.auth.admin,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { logout })(Header)
