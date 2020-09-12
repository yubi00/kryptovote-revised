import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { registerUser } from '../actions/auth'
import { clearErrors } from '../actions/errors'
import Loader from './Loader'

export class Register extends Component {
  state = {
    email: '',
    password: '',
    message: null,
    loading: false
  }

  componentDidUpdate = (prevProps) => {
    const { error, user, clearErrors } = this.props

    if (prevProps.error !== error) {
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ message: error.message })
        this.setState({ loading: false })
      } else {
        this.setState({ message: '' })
      }
    }
    if (this.props.isModalOpen) {
      if (user) {
        clearErrors()
        this.props.closeModal()
        this.setState({ loading: false })
      }
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
    this.setState({ message: '' })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { email, password } = this.state
    if (!email || !password)
      return this.setState({ message: 'Please provide both required fields ' })

    this.setState({ loading: true })
    this.props.registerUser(email, password)
  }

  render() {
    const { email, password, message, loading } = this.state
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
          <div> {loading && <Loader />} </div>
        </form>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  error: state.error,
  user: state.auth.user
})

export default connect(mapStateToProps, { registerUser, clearErrors })(Register)
