import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { endElection } from '../actions/elections'

export class Counter extends Component {
  state = {
    hours: null,
    minutes: null,
    seconds: null,
    status: null
  }
  componentDidMount = () => {
    this.setCounter()
  }

  setCounter = () => {
    setInterval(() => {
      this.getTimeLeft()
      const { minutes, hours, seconds } = this.state
      if (hours === 0 && minutes === 0 && seconds === 0) {
        this.setState({ status: 'VOTING PERIOD ENDED' })
        this.setState({ hour: null, minutes: null, seconds: null })
        this.props.endElection()
      } else if (seconds === 0 && minutes !== 0) {
        this.setState((prevState) => {
          return { minutes: prevState.minutes - 1, seconds: 60 }
        })
      } else if (minutes === 0 && hours !== 0) {
        this.setState((prevState) => {
          return { hours: prevState.hours - 1, minutes: 59, seconds: 60 }
        })
      }

      this.setState((prevState) => {
        return { seconds: prevState.seconds - 1 }
      })
    }, 1000)
  }

  getTimeLeft = async () => {
    const { instance } = this.props
    try {
      const votingDeadline = await instance.methods.getVotingDeadline().call()
      const currentTime = moment()
      const votingEndTime = moment.unix(votingDeadline)
      const difference = votingEndTime.diff(currentTime, 'seconds')

      if (difference > 0) {
        const hours = votingEndTime.diff(currentTime, 'hours')
        const minutes = votingEndTime.diff(currentTime, 'minutes') - hours * 60
        const seconds =
          votingEndTime.diff(currentTime, 'seconds') -
          (hours * 60 * 60 + minutes * 60)

        this.setState({ hours, minutes, seconds })
      } else {
        this.setState({ status: 'VOTING PERIOD ENDED' })
      }
    } catch (error) {
      return
    }
  }

  render() {
    const { hours, minutes, seconds, status } = this.state
    return (
      <div>
        {hours !== null && minutes !== null && seconds !== null ? (
          <h1>
            {hours} <span>hours</span> {minutes} <span>minutes</span> {seconds}{' '}
            <span>seconds</span>
          </h1>
        ) : (
          <h1>{status} </h1>
        )}
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  instance: state.web3.instance
})

export default connect(mapStateToProps, { endElection })(Counter)
