import React, { Component } from 'react'
import { connect } from 'react-redux'
import { registerUser } from '../actions/auth'
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

export class Register extends Component {
  state = {
    email: '',
    password: '',
    message: null,
    loading: false
  }

  componentDidUpdate = (prevProps) => {
    const { error, user } = this.props

    if (prevProps.error !== error) {
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ message: error.message })
        this.setState({ loading: false })
      } else {
        this.setState({ message: '' })
      }
    }
    if (this.props.isModalOpen) {
      if (user !== prevProps.user) {
        this.props.toggle()
        this.props.toggleLogin()
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
    this.setState({ email: '', password: '' })
  }

  render() {
    const { message, loading } = this.state
    return (
      <div>
        <Modal isOpen={this.props.isModalOpen} toggle={this.props.toggle}>
          <ModalHeader toggle={this.props.toggle}>Register</ModalHeader>
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
                  {loading ? <Loader /> : 'Register'}
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  error: state.error,
  user: state.auth.user
})

export default connect(mapStateToProps, { registerUser })(Register)
