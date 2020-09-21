import React, { Component } from 'react'
import { storage } from '../firebase/firebase'
import { connect } from 'react-redux'
import {
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Button
} from 'reactstrap'
import { addCandidate } from '../actions/candidates'
import { history } from '../routers/history'
import Loader from './Loader'

export class CreateCandidate extends Component {
  state = {
    candidatename: '',
    partyname: '',
    image: null,
    partysymbol: '',
    message: '',
    loading: false,
    disabled: false
  }

  onChange = (e) => {
    this.setState({ disabled: false })
    this.setState({ message: '' })
    this.setState({ [e.target.name]: e.target.value })
  }

  handleFileChange = (e) => {
    const image = e.target.files[0]
    if (image) {
      this.setState({ image })
    }
  }

  onSubmit = async (e) => {
    e.preventDefault()
    const { image, candidatename, partyname } = this.state
    const { instance, accounts, web3 } = this.props
    this.setState({ disabled: true })
    if (!image || !candidatename || !partyname) {
      return this.setState({
        message: 'Please provide all the required fields'
      })
    }
    this.setState({ loading: true })
    //upload image to firebase
    const upload = storage.ref(`images/${image.name}`).put(image)

    upload.on(
      'state_changed',
      (snapshot) => {},
      (error) => {
        console.log(error)
      },
      () => {
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            this.setState({ partysymbol: url })

            //store new candidate info on blockchain
            return instance.methods
              .addCandidate(
                web3.utils.stringToHex(candidatename),
                web3.utils.stringToHex(partyname),
                url
              )
              .send({
                from: accounts[0],
                gas: 500000,
                gasPrice: web3.utils.toWei('50', 'gwei')
              })
          })
          .then((res) => {
            const candidate = {
              candidatename,
              partyname,
              partysymbol: this.state.partysymbol
            }
            this.props.addCandidate(candidate)
            this.setState({ loading: false })
            history.push('/candidate')
          })
          .catch((e) => {
            this.setState({ message: e.message })
          })
      }
    )
  }

  render() {
    const { message, loading, disabled } = this.state
    return (
      <Container className="mb-5">
        {message && <Alert color="danger">{message}</Alert>}
        <Form onSubmit={this.onSubmit} className="border p-4">
          <FormGroup>
            <Label for="candidatename">Candidate Name</Label>
            <Input
              type="candidatename"
              name="candidatename"
              id="candidatename"
              placeholder="candidate name"
              onChange={this.onChange}
              className="mb-3"
            />
            <Label for="partyname">Party Name</Label>
            <Input
              type="partyname"
              name="partyname"
              id="partyname"
              placeholder="partyname"
              onChange={this.onChange}
              className="mb-3"
            />
            <Input
              type="file"
              name="image"
              accept=".jpg, .png, .jpeg"
              onChange={this.handleFileChange}
              className="mb-3"
            />
            <Button disabled={disabled}>{loading ? <Loader /> : 'Save'}</Button>
          </FormGroup>
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  web3: state.web3.web3,
  accounts: state.web3.accounts,
  instance: state.web3.instance
})

export default connect(mapStateToProps, { addCandidate })(CreateCandidate)
