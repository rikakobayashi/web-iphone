import React from 'react'

interface BackgroundProps {
  isLockScreen: boolean
  img_url: string
}

export default class Background extends React.Component<BackgroundProps, {}> {
  constructor(props: Readonly<BackgroundProps>) {
    super(props)
  }

  render() {
    return (
      <div
        className={`background ${
          !this.props.isLockScreen ? 'background-blur' : ''
        }`}
        style={{
          backgroundImage: `url(${this.props.img_url})`,
        }}
      >
        <div className="blur" />
      </div>
    )
  }
}
