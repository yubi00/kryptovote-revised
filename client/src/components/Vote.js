import React, { Component } from 'react'
import { connect } from 'react-redux'
import Candidate from './Candidate'

export class Vote extends Component {
  state = {
    selectedOption: ''
  }

  setValue = (selectedOption) => {
    this.setState({ selectedOption })
  }

  render() {
    const { candidates } = this.props
    return (
      <div>
        <h1>Cast vote to your favourite candidate</h1>
        {this.state.selectedOption && this.state.selectedOption}
        {candidates ? (
          candidates.map((candidate, i) => {
            return (
              <Candidate
                candidate={candidate}
                key={i}
                selectedOption={this.state.selectedOption}
                setValue={this.setValue}
              />
            )
          })
        ) : (
          <h2>No candidates added yet</h2>
        )}
        <button>Cast Vote</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  candidates: state.candidates
})

export default connect(mapStateToProps, undefined)(Vote)
