import React, { Component } from 'react'
import { storage } from '../firebase/firebase'
import { connect } from 'react-redux'

export class CreateCandidate extends Component {
  state = {
    candidatename: '',
    partyname: '',
    image: null,
    partysymbol: '',
    message: ''
  }

  onChange = (e) => {
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

    if (!image || !candidatename || !partyname) {
      return this.setState({
        message: 'Please provide all the required fields'
      })
    }
    const isallowed = await instance.methods.isAllowed().call()
    if (isallowed) {
      return this.setState({
        message: 'Please wait till the voting period ends'
      })
    }

    //upload image to firebase
    const upload = storage.ref(`images/${image.name}`).put(image)

    upload.on(
      'state_changed',
      (snapshot) => {},
      (error) => {
        console.log(error)
      },
      () => {
        console.log('uploaded success')
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url)
            this.setState({ partysymbol: url })

            //store new candidate info on blockchain
            return instance.methods
              .addCandidate(
                web3.utils.stringToHex(candidatename),
                web3.utils.stringToHex(partyname),
                url
              )
              .send({ from: accounts[0], gas: 4712388 })
          })
          .then((res) => {
            console.log('candidate added successfully')
            console.log(res)
          })
          .catch((e) => {
            console.log(e.message)
          })
      }
    )
  }

  render() {
    const { candidatename, partyname, message } = this.state
    return (
      <div>
        <h1>Add Candidate</h1>
        {message && <h2>{message}</h2>}
        <form onSubmit={this.onSubmit}>
          <label>Candidate Name</label>
          <input
            type="text"
            name="candidatename"
            value={candidatename}
            onChange={this.onChange}
          />
          <label>Party Name</label>
          <input
            type="text"
            name="partyname"
            value={partyname}
            onChange={this.onChange}
          />
          <input
            type="file"
            name="image"
            accept=".jpg, .png, .jpeg"
            onChange={this.handleFileChange}
          />
          <button>Save</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  web3: state.web3.web3,
  accounts: state.web3.accounts,
  instance: state.web3.instance
})

export default connect(mapStateToProps, undefined)(CreateCandidate)
