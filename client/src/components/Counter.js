import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

export class Counter extends Component {
  state = {
    difference: null,
    hours: null,
    minutes: null,
    seconds: null
  }
  componentDidMount = () => {
    this.getTimeLeft()
    this.setCounter()
  }

  setCounter = () => {
    setInterval(() => {
      const { minutes, hours, seconds } = this.state
      if (hours === 0 && minutes === 0 && seconds === 0) return
      if (seconds === 0) {
        this.setState((prevState) => {
          return { minutes: prevState.minutes - 1, seconds: 60 }
        })
      }
      if (minutes === 0) {
        this.setState((prevState) => {
          return { hours: prevState.hours - 1, minutes: 59, seconds: 60 }
        })
      }

      this.setState((prevState) => {
        return { seconds: prevState.seconds - 1 }
      })
    }, 1000)
  }

  getTimeLeft = () => {
    const { votingDeadline } = this.props
    const currentTime = moment()
    const votingEndTime = moment.unix(votingDeadline)
    const difference = votingEndTime.diff(currentTime, 'seconds')
    this.setState({ difference })

    if (difference > 0) {
      const hours = votingEndTime.diff(currentTime, 'hours')
      const minutes = votingEndTime.diff(currentTime, 'minutes') - hours * 60
      const seconds =
        votingEndTime.diff(currentTime, 'seconds') -
        (hours * 60 * 60 + minutes * 60)

      this.setState({ hours, minutes, seconds })
    }
  }

  render() {
    const { hours, minutes, seconds, difference } = this.state
    return (
      <div>
        {difference > 0 && (
          <h1>
            {hours} <span>hours</span> {minutes} <span>minutes</span> {seconds}{' '}
            <span>seconds</span>
          </h1>
        )}
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  votingDeadline: state.elections.votingDeadline
})

export default connect(mapStateToProps, undefined)(Counter)
