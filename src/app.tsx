import React from 'react'
import * as ReactDOM from 'react-dom'
import './style.scss'
import { parse } from 'querystring'
import LockScreen from '../components/lockScreen'
import Passcord from '../components/passcord'
import Background from '../components/background'
import Buttons from '../components/buttons'

interface AppProps {}

interface AppState {
  isLockScreen: boolean
  isPowerOn: boolean
  img_url: string
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: Readonly<AppProps>) {
    super(props)
    this.state = {
      isLockScreen: true,
      isPowerOn: true,
      img_url: 'https://pics.prcm.jp/566b9c2d0ab74/82298202/png/82298202.png',
    }
  }

  componentDidMount() {
    this.setImage()
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
    this.setState({
      isPowerOn: !this.state.isPowerOn,
      isLockScreen: true,
    })
  }

  switchToPasscord = () => {
    if (!this.state.isLockScreen) return
    this.setState({
      isLockScreen: false,
    })
  }

  switchToLockScreen = () => {
    if (this.state.isLockScreen) return
    this.setState({
      isLockScreen: true,
    })
  }

  render() {
    return (
      <div className="wrapper">
        <Buttons switchPower={this.switchPower} />
        <div className="bezel bezel-center" />
        <div className="body" id="body">
          {this.state.isPowerOn ? (
            <Background
              isLockScreen={this.state.isLockScreen}
              img_url={this.state.img_url}
            />
          ) : undefined}
          {this.state.isPowerOn &&
            (this.state.isLockScreen ? (
              <LockScreen switchToPasscord={this.switchToPasscord} />
            ) : (
              <Passcord switchToLockScreen={this.switchToLockScreen} />
            ))}
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
