import React from 'react'
import './index.scss'

const Header = props => {
  const { onRefresh, onGoLive } = props
  return (
    <header className='header'>
      <div className='content'>
        <div className='brand'>Vapour</div>
        <div className='actions'>
          <button onClick={onGoLive}>Go live</button>
          <button onClick={onRefresh}>Refresh</button>
        </div>
      </div>
    </header>
  )
}

export default Header
