import React from 'react'

interface ButtonsProps {
  switchPower: () => void
}

export default class Buttons extends React.Component<ButtonsProps, {}> {
  constructor(props: Readonly<ButtonsProps>) {
    super(props)
  }

  render() {
    return (
      <>
        <div className="button button-left button-mode" />
        <div className="button button-left button-volume-up" />
        <div className="button button-left button-volume-down" />
        <div className="button button-right" onClick={this.props.switchPower} />
      </>
    )
  }
}
