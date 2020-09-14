import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { loginUser } from '../actions/auth'
import { clearErrors } from '../actions/errors'
import Loader from './Loader'

export class Login extends Component {
  state = {
    email: '',
    password: '',
    message: '',
    loading: false
  }

  componentDidUpdate = async (prevProps) => {
    const { error, isAuthenticated } = this.props
    if (prevProps.error !== error) {
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ message: error.message })
        this.setState({ loading: false })
      } else {
        this.setState({ message: '' })
      }
    }

    if (this.props.isModalOpen) {
      if (isAuthenticated) {
        this.props.clearErrors()
        this.props.closeModal()
        this.setState({ loading: false })
      }
    }
  }

  onSubmit = (e) => {
    e.preventDefault()

    const { email, password } = this.state
    if (!email || !password) {
      return this.setState({ message: 'Both fields are required' })
    }

    this.setState({ loading: true })
    this.props.loginUser(email, password)
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
    this.setState({ message: '' })
  }

  render() {
    const { email, password, message, loading } = this.state
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
            onChange={this.onChange}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={this.onChange}
          />
          <button>Login</button>
          <div>{!this.props.isAuthenticated && loading && <Loader />}</div>
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
