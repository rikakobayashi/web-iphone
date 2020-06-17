import React from 'react'

export default function Header() {
  return (
    <div className="header">
      <div className="bezel bezel-left">
        <div className="carrier">SoftBank</div>
      </div>
      <div className="bezel bezel-wrapper"></div>
      <div className="bezel bezel-right">
        <div className="icon signal">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <title>ionicons-v5-l</title>
            <path d="M472,432H424a24,24,0,0,1-24-24V104a24,24,0,0,1,24-24h48a24,24,0,0,1,24,24V408A24,24,0,0,1,472,432Z" />
            <path d="M344,432H296a24,24,0,0,1-24-24V184a24,24,0,0,1,24-24h48a24,24,0,0,1,24,24V408A24,24,0,0,1,344,432Z" />
            <path d="M216,432H168a24,24,0,0,1-24-24V248a24,24,0,0,1,24-24h48a24,24,0,0,1,24,24V408A24,24,0,0,1,216,432Z" />
            <path d="M88,432H40a24,24,0,0,1-24-24V312a24,24,0,0,1,24-24H88a24,24,0,0,1,24,24v96A24,24,0,0,1,88,432Z" />
          </svg>
        </div>
        <div className="icon wifi">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
          </svg>
        </div>
        <div className="icon battery">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 612 442">
            <title>ionicons-v5-d</title>
            <rect
              x="32"
              y="144"
              width="400"
              height="224"
              rx="45.7"
              ry="45.7"
              style={{
                fill: 'none',
                stroke: 'white',
                strokeLinecap: 'square',
                strokeMiterlimit: 10,
                strokeWidth: '10px',
              }}
            />
            <rect
              x="85.69"
              y="198.93"
              width="154.31"
              height="114.13"
              rx="4"
              ry="4"
              style={{
                stroke: 'white',
                strokeLinecap: 'square',
                strokeMiterlimit: 10,
                strokeWidth: '32px',
              }}
            />
            <line
              x1="530"
              y1="228.67"
              x2="530"
              y2="283.33"
              style={{
                fill: 'none',
                stroke: 'white',
                strokeLinecap: 'round',
                strokeMiterlimit: 10,
                strokeWidth: '32px',
              }}
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
