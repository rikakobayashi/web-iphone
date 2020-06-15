import React from 'react'
import * as ReactDOM from 'react-dom'
import './style.scss'
import Header from '../components/header'
import Lock from '../components/lock'
import { parse } from 'querystring'

interface AppProps {}

interface AppState {
  isLockScreen: boolean
  isPowerOn: boolean
  pass: Array<number>
  time: string
  date: string
  img_url: string
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: Readonly<AppProps>) {
    super(props)
    this.state = {
      isLockScreen: true,
      isPowerOn: true,
      pass: [],
      time: '22:13',
      date: '12月2日 土曜日',
      img_url: 'https://pics.prcm.jp/566b9c2d0ab74/82298202/png/82298202.png',
    }
  }

  content: React.RefObject<HTMLDivElement> = React.createRef()
  keys: { [keys: number]: HTMLDivElement } = {}
  input: React.RefObject<HTMLDivElement> = React.createRef()

  componentDidMount() {
    this.setDateTime()
    setInterval(this.setDateTime, 1000)
    this.setImage()
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

  getQueryParam() {
    const rawParam = decodeURI(location.search.substring(1))
    return parse(rawParam)
  }

  setImage() {
    const queryParam = this.getQueryParam()
    if (queryParam.img) {
      if (typeof queryParam.img == 'object') {
        this.setState({
          img_url: queryParam.img[0],
        })
      } else {
        this.setState({
          img_url: queryParam.img,
        })
      }
    }
  }

  switchPower = () => {
    console.log(this.state.isPowerOn ? 'off' : 'on')
    this.setState({
      isPowerOn: !this.state.isPowerOn,
      isLockScreen: true,
      pass: [],
    })
  }

  switchToPasscord = () => {
    if (!this.state.isLockScreen) return
    this.setState({
      isLockScreen: false,
    })
  }

  delete = () => {
    this.state.pass.pop()
    this.setState({
      pass: this.state.pass,
    })
  }

  cancel = () => {
    const keyElements = document.getElementsByClassName('key')
    const keys = Array.from(keyElements)
    keys.forEach((key) => key.classList.add('key-out'))
    this.content.current?.classList.add('background-out')
    setTimeout(() => this.switchToLockScreen(keys), 150)
  }

  switchToLockScreen = (keys: Element[]) => {
    if (this.state.isLockScreen) return
    this.setState({
      isLockScreen: true,
      pass: [],
    })
    keys.forEach((key) => key.classList.remove('key-out'))
    this.content.current?.classList.remove('background-out')
  }

  clickButton = (number: number) => {
    if (this.state.pass.length < 3) {
      this.input.current?.classList.remove('passcord-missed')
      this.state.pass.push(number)
      this.setState({
        pass: this.state.pass,
      })
    } else {
      this.input.current?.classList.add('passcord-missed')
      setTimeout(this.delete, 150)
      setTimeout(this.delete, 300)
      setTimeout(this.delete, 450)
      setTimeout(this.delete, 600)
    }
  }

  render() {
    return (
      <div className="wrapper">
        <div className="button button-left button-mode" />
        <div className="button button-left button-volume-up" />
        <div className="button button-left button-volume-down" />
        <div className="button button-right" onClick={this.switchPower} />
        <div
          className="body"
          id="body"
          style={
            this.state.isPowerOn
              ? { backgroundImage: `url(${this.state.img_url})` }
              : undefined
          }
        >
          <div className="bezel bezel-center" />
          {this.state.isPowerOn &&
            (this.state.isLockScreen ? (
              <div
                className="lock-screen"
                id="lock-screen"
                onClick={this.switchToPasscord}
              >
                <Header />
                <Lock />
                <div className="time">{this.state.time}</div>
                <div className="date">{this.state.date}</div>
                <div className="blank"></div>
                <div className="text">
                  上にスワイプして
                  <br />
                  ロック解除
                </div>
                <div className="line-area">
                  <div className="line"></div>
                </div>
              </div>
            ) : (
              <div className="content" id="content" ref={this.content}>
                <Header />
                <Lock />
                <div className="passcord">
                  <div className="label">パスコードを入力</div>
                  <div className="input" id="input" ref={this.input}>
                    <span className="circle ">
                      {this.state.pass.length < 1 ? '○' : '●'}
                    </span>
                    <span className="circle">
                      {this.state.pass.length < 2 ? '○' : '●'}
                    </span>
                    <span className="circle">
                      {this.state.pass.length < 3 ? '○' : '●'}
                    </span>
                    <span className="circle">
                      {this.state.pass.length < 4 ? '○' : '●'}
                    </span>
                  </div>
                </div>
                <div className="keys">
                  <div
                    className="key key-1"
                    onClick={() => this.clickButton(1)}
                    ref={(ref) => (this.keys[1] = ref!)}
                  >
                    <span className="number">1</span>
                  </div>
                  <div
                    className="key key-2"
                    onClick={() => this.clickButton(2)}
                    ref={(ref) => (this.keys[2] = ref!)}
                  >
                    <span className="number">2</span>
                    <span className="alphabet">ABC</span>
                  </div>
                  <div
                    className="key key-3"
                    onClick={() => this.clickButton(3)}
                    ref={(ref) => (this.keys[3] = ref!)}
                  >
                    <span className="number">3</span>
                    <span className="alphabet">DEF</span>
                  </div>
                  <div
                    className="key key-4"
                    onClick={() => this.clickButton(4)}
                    ref={(ref) => (this.keys[4] = ref!)}
                  >
                    <span className="number">4</span>
                    <span className="alphabet">GHI</span>
                  </div>
                  <div
                    className="key key-5"
                    onClick={() => this.clickButton(5)}
                    ref={(ref) => (this.keys[5] = ref!)}
                  >
                    <span className="number">5</span>
                    <span className="alphabet">JKL</span>
                  </div>
                  <div
                    className="key key-6"
                    onClick={() => this.clickButton(6)}
                    ref={(ref) => (this.keys[6] = ref!)}
                  >
                    <span className="number">6</span>
                    <span className="alphabet">MNO</span>
                  </div>
                  <div
                    className="key key-7"
                    onClick={() => this.clickButton(7)}
                    ref={(ref) => (this.keys[7] = ref!)}
                  >
                    <span className="number">7</span>
                    <span className="alphabet">PQRS</span>
                  </div>
                  <div
                    className="key key-8"
                    onClick={() => this.clickButton(8)}
                    ref={(ref) => (this.keys[8] = ref!)}
                  >
                    <span className="number">8</span>
                    <span className="alphabet">TUV</span>
                  </div>
                  <div
                    className="key key-9"
                    onClick={() => this.clickButton(9)}
                    ref={(ref) => (this.keys[9] = ref!)}
                  >
                    <span className="number">9</span>
                    <span className="alphabet">WXYZ</span>
                  </div>
                  <div
                    className="key key-0"
                    onClick={() => this.clickButton(0)}
                    ref={(ref) => (this.keys[0] = ref!)}
                  >
                    <span className="number number-0">0</span>
                  </div>
                </div>
                <div className="bottom">
                  <div className="emergency">緊急</div>
                  {this.state.pass.length === 0 ? (
                    <div className="cancel" onClick={this.cancel}>
                      キャンセル
                    </div>
                  ) : (
                    <div className="delete" onClick={this.delete}>
                      削除
                    </div>
                  )}
                </div>
                <div className="line-area">
                  <div className="line"></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
