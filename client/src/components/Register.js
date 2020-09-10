import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { registerUser } from '../actions/auth'
import { clearErrors } from '../actions/errors'

export class Register extends Component {
  state = {
    email: '',
    password: '',
    message: ''
  }

  componentDidUpdate = (prevProps) => {
    const { error, user } = this.props
    if (prevProps.error !== error) {
      if (this.props.error.id === 'REGISTER_FAIL') {
        this.setState({ message: error.message })
      } else {
        this.setState({ message: '' })
      }
    }

    if (user) {
      this.props.closeModal()
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
    this.setState({ message: '' })
  }

  onSubmit = (e) => {
    e.preventDefault()

    const { email, password } = this.state
    this.props.registerUser(email, password)
  }

  render() {
    const { email, password, message } = this.state
    return (
      <Modal
        isOpen={this.props.isModalOpen}
        onRequestClose={this.props.closeModal}
        ariaHideApp={false}
        className="register-modal"
      >
        {message && <h2>{message}</h2>}
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
          <button>Register</button>
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

export default connect(mapStateToProps, { registerUser, clearErrors })(Register)
