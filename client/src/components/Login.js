import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { loginUser } from '../actions/auth'
import { clearErrors } from '../actions/errors'
import { generateEthAddress } from '../utils/generateEthAddress'
import { addVoter } from '../actions/voters'
import Loader from './Loader'

export class Login extends Component {
  state = {
    email: '',
    password: '',
    message: '',
    loading: false
  }

  componentDidUpdate = async (prevProps) => {
    const {
      error,
      isAuthenticated,
      admin,
      instance,
      accounts,
      web3,
      user,
      addVoter
    } = this.props
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
        if (!admin) {
          const voteraddress = generateEthAddress(web3, user.email)
          await instance.methods
            .addVoter(web3.utils.toHex(voteraddress))
            .send({ from: accounts[0], gas: 600000 })

          addVoter(voteraddress)
        }
      }
    }
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.setState({ loading: true })
    const { email, password } = this.state
    this.props.loginUser(email, password)
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
          <div>{!this.props.isAuthenticated && loading && <Loader />}</div>
        </form>
      </Modal>
    )
  }
}
const mapStateToProps = (state) => ({
  error: state.error,
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  admin: state.auth.admin,
  instance: state.web3.instance,
  web3: state.web3.web3,
  accounts: state.web3.accounts
})

export default connect(mapStateToProps, { loginUser, clearErrors, addVoter })(
  Login
)
