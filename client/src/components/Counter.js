import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { endElection } from '../actions/elections'
import { Container } from 'reactstrap'
import CounterCard from './CounterCard'
import '../styles/Counter.css'

export class Counter extends Component {
  state = {
    days: null,
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
    }, 1000)
  }

  getTimeLeft = async () => {
    const { instance } = this.props
    try {
      const votingEndTime = await instance.methods.getVotingDeadline().call()
      const currentTime = moment().unix()

      const totalSeconds = Math.floor(votingEndTime - currentTime)

      const days = Math.floor(totalSeconds / 3600 / 24)
      const hours = Math.floor(totalSeconds / 3600) % 24
      const minutes = Math.floor(totalSeconds / 60) % 60
      const seconds = Math.floor(totalSeconds) % 60

      if (totalSeconds > 0) {
        this.setState({
          days,
          hours: this.formatTime(hours),
          minutes: this.formatTime(minutes),
          seconds: this.formatTime(seconds)
        })
      } else {
        this.setState({ status: 'VOTING PERIOD ENDED' })
      }
    } catch (error) {
      return
    }
  }

  formatTime = (time) => {
    return time < 10 ? `0${time}` : time
  }

  render() {
    const { days, hours, minutes, seconds, status } = this.state
    return (
      <Container fluid className="mb-5 text-center bg-light p-5 text-dark">
        {hours !== null && minutes !== null && seconds !== null ? (
          <div className="counter">
            <CounterCard type={days} title={days > 1 ? 'Days' : 'Day'} />
            <CounterCard type={hours} title={hours > 1 ? 'Hours' : 'Hour'} />
            <CounterCard
              type={minutes}
              title={minutes > 1 ? 'Minutes' : 'Minute'}
            />
            <CounterCard
              type={seconds}
              title={seconds > 1 ? 'Seconds' : 'Second'}
            />
          </div>
        ) : (
          <h1 className="text-dark">{status} </h1>
        )}
      </Container>
    )
  }
}
const mapStateToProps = (state) => ({
  instance: state.web3.instance
})

export default connect(mapStateToProps, { endElection })(Counter)
