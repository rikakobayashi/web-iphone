import React from 'react'
import Header from './header'
import LockIcon from './lockIcon'
import HomeBar from './homeBar'

interface LockScreenProps {
  switchToPasscord: () => void
}
interface LockScreenState {
  time: string
  date: string
}

export default class LockScreen extends React.Component<
  LockScreenProps,
  LockScreenState
> {
  constructor(props: Readonly<LockScreenProps>) {
    super(props)
    this.state = {
      time: '22:13',
      date: '12月2日 土曜日',
    }
  }

  timerID: NodeJS.Timeout | null = null

  componentDidMount() {
    this.setDateTime()
    this.timerID = setInterval(this.setDateTime, 1000)
  }

  componentWillUnmount() {
    if (this.timerID) clearInterval(this.timerID)
  }

  setDateTime = () => {
    this.setTime()
    this.setDate()
  }

  setTime() {
    const now = new Date()
    const hour = now.getHours()
    const minute = ('0' + now.getMinutes()).slice(-2)
    this.setState({
      time: `${hour}:${minute}`,
    })
  }

  setDate() {
    const days = ['日', '月', '火', '水', '木', '金', '土']
    const now = new Date()
    const month = now.getMonth() + 1
    const date = now.getDate()
    const day = days[now.getDay()]
    this.setState({
      date: `${month}月${date}日 ${day}曜日`,
    })
  }

  render() {
    return (
      <div
        className="lock-screen"
        id="lock-screen"
        onClick={this.props.switchToPasscord}
      >
        <Header />
        <LockIcon />
        <div className="time">{this.state.time}</div>
        <div className="date">{this.state.date}</div>
        <div className="text-wrapper">
          <div className="text">
            上にスワイプして
            <br />
            ロック解除
          </div>
        </div>
        <HomeBar />
      </div>
    )
  }
}
