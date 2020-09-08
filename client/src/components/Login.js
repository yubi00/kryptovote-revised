import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { loginUser } from '../actions/auth'
import { clearErrors } from '../actions/errors'

export class Login extends Component {
  state = {
    email: '',
    password: '',
    message: ''
  }
  componentDidUpdate = (prevProps) => {
    if (prevProps.error !== this.props.error) {
      if (this.props.error.id === 'LOGIN_FAIL') {
        this.setState({ message: this.props.error.message })
      } else {
        this.setState({ message: '' })
      }
    }

    if (this.props.isAuthenticated) {
      this.props.closeModal()
    }
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { email, password } = this.state
    this.props.loginUser(email, password)
  }

  render() {
    const { email, password, message } = this.state
    return (
      <Modal
        isOpen={this.props.isModalOpen}
        onRequestClose={this.props.closeModal}
        ariaHideApp={false}
        className="login-modal"
      >
        {message && <h2>{message} </h2>}
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="email"
            name="email"
            value={email}
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          <button>Login</button>
        </form>
      </Modal>
    )
  }
}
const mapStateToProps = (state) => ({
  error: state.error,
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { loginUser, clearErrors })(Login)
