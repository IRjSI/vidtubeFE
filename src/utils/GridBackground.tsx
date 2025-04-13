import React from 'react'

const GridBackground = () => {
  return (
    <div>
      <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(99, 102, 241, 0.05) 25%, transparent 25%),
              linear-gradient(-45deg, rgba(99, 102, 241, 0.05) 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, rgba(99, 102, 241, 0.05) 75%),
              linear-gradient(-45deg, transparent 75%, rgba(99, 102, 241, 0.05) 75%)
            `,
            backgroundSize: '200px 200px',
            backgroundPosition: '0 0, 0 50px, 50px -50px, -50px 0px',
            animation: 'backgroundShift 20s linear infinite',
          }} />
        </div>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
        }} />
    </div>
  )
}

export default GridBackground
