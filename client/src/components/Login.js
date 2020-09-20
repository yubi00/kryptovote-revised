import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../actions/auth'
import Loader from './Loader'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from 'reactstrap'

export class Login extends Component {
  state = {
    email: '',
    password: '',
    message: '',
    loading: false
  }

  componentDidUpdate = async (prevProps) => {
    const { error, isAuthenticated, clearErrors } = this.props
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
        this.props.toggle()
        this.setState({ loading: false })
      }
    }
  }

  onSubmit = (e) => {
    e.preventDefault()

    const { email, password } = this.state
    if (!email || !password) {
      return this.setState({ message: 'Please provide both required fields' })
    }

    this.setState({ loading: true })
    this.props.loginUser(email, password)
    this.setState({ email: '', password: '' })
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
    this.setState({ message: '' })
  }

  render() {
    const { message, loading } = this.state
    return (
      <Modal isOpen={this.props.isModalOpen} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>Login</ModalHeader>
        <ModalBody>
          {message && <Alert color="danger">{message}</Alert>}
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                onChange={this.onChange}
              />
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                onChange={this.onChange}
              />
              <Button color="dark" style={{ marginTop: '2rem' }} block>
                {loading ? <Loader /> : 'Login'}
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
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
