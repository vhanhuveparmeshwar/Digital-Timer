import {Component} from 'react'

import './index.css'

const initialState = {
  isTimerRunning: false,
  timeElapsedInSeconds: 0,
  timerLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  onIncrementTimer = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  onDecrementTimer = () => {
    const {timerLimitInMinutes} = this.state
    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state

    const isTimerCompleted = timerLimitInMinutes * 60 === timeElapsedInSeconds

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  onStartOrPauseTimer = () => {
    const {
      timerLimitInMinutes,
      timeElapsedInSeconds,
      isTimerRunning,
    } = this.state

    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }

    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }

    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timeElapsedInSeconds, timerLimitInMinutes} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds

    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {
      isTimerRunning,
      timerLimitInMinutes,
      timeElapsedInSeconds,
    } = this.state

    const status = isTimerRunning ? 'Running' : 'Paused'
    const btnIcon = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const iconAltText = isTimerRunning ? 'pause icon' : 'play icon'
    const btnText = isTimerRunning ? 'Pause' : 'Start'
    const isButtonsDisabled = timeElapsedInSeconds > 0

    return (
      <div className="main-container">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="sub-container">
          <div className="round-div">
            <div className="content-div">
              <h1 className="color-text">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="status">{status}</p>
            </div>
          </div>

          <div className="side-div">
            <div className="start-reset">
              <button
                type="button"
                className="btn"
                onClick={this.onStartOrPauseTimer}
              >
                <img className="icon" src={btnIcon} alt={iconAltText} />
                <p>{btnText}</p>
              </button>

              <button className="btn" type="button" onClick={this.onResetTimer}>
                <img
                  className="icon"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                />
                <p>Reset</p>
              </button>
            </div>

            <p className="set-limit">Set Timer Limit</p>

            <div className="limit-setter">
              <button
                className="set-button"
                type="button"
                disabled={isButtonsDisabled}
                onClick={this.onDecrementTimer}
              >
                -
              </button>

              <p className="time-set">{timerLimitInMinutes}</p>

              <button
                className="set-button"
                type="button"
                disabled={isButtonsDisabled}
                onClick={this.onIncrementTimer}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
