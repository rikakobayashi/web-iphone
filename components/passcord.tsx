import React from 'react'
import Header from './header'
import LockIcon from './lockIcon'
import HomeBar from './homeBar'

interface PasscordProps {
  switchToLockScreen: () => void
}
interface PasscordState {
  pass: Array<number>
}

const keyContents = [
  { number: 1, alphabet: ' ' },
  { number: 2, alphabet: 'ABC' },
  { number: 3, alphabet: 'DEF' },
  { number: 4, alphabet: 'GHI' },
  { number: 5, alphabet: 'JKL' },
  { number: 6, alphabet: 'MNO' },
  { number: 7, alphabet: 'PQRS' },
  { number: 8, alphabet: 'TUV' },
  { number: 9, alphabet: 'WXYZ' },
  { number: 0, alphabet: null },
]

export default class Passcord extends React.Component<
  PasscordProps,
  PasscordState
> {
  constructor(props: Readonly<PasscordProps>) {
    super(props)
    this.state = {
      pass: [],
    }
  }

  content: React.RefObject<HTMLDivElement> = React.createRef()
  passcord: React.RefObject<HTMLDivElement> = React.createRef()
  keys: Array<React.RefObject<HTMLDivElement>> = [
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]
  input: React.RefObject<HTMLDivElement> = React.createRef()
  bottom: React.RefObject<HTMLDivElement> = React.createRef()

  resetPass = () => {
    this.setState({
      pass: [],
    })
  }

  cancel = () => {
    this.keys.forEach((key) => key.current?.classList.add('key-out'))
    this.passcord.current?.classList.add('fadeout')
    this.bottom.current?.classList.add('fadeout')
    setTimeout(() => this.props.switchToLockScreen(), 200)
  }

  delete = () => {
    this.state.pass.pop()
    this.setState({
      pass: this.state.pass,
    })
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
      <div className="content" id="content" ref={this.content}>
        <Header />
        <LockIcon />
        <div className="passcord" ref={this.passcord}>
          <div className="label">パスコードを入力</div>
          <div className="input" id="input" ref={this.input}>
            <span className="circle">
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
          {keyContents.map((keyContent, index) => {
            return (
              <div
                className={`key-wrapper key-${keyContent.number}`}
                key={`key-${index}`}
              >
                <div
                  className="key"
                  onClick={() => this.clickButton(keyContent.number)}
                  ref={this.keys[index]}
                >
                  <div className="key-texts">
                    <span className="number">{keyContent.number}</span>
                    {keyContent.alphabet ? (
                      <span className="alphabet">{keyContent.alphabet}</span>
                    ) : undefined}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="bottom" ref={this.bottom}>
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
        <HomeBar />
      </div>
    )
  }
}
