import React from 'react'
import './index.scss'

const StatusBar = props => {
  const {
    data: { keyCount, cacheHits, cacheMisses, startupMS }
  } = props

  return (
    <div className='status-bar-wrapper'>
      <div className='metric'>
        <div className='text'>Key Count:</div>
        <div className='data'>{keyCount}</div>
      </div>
      <div className='metric'>
        <div className='text'>Cache Hit Ratio:</div>
        <div className='data'>
          {String(cacheHits / (cacheMisses + cacheHits)).substring(0, 5) || '-'}
        </div>
      </div>
      <div className='metric'>
        <div className='text'>Uptime:</div>
        <div className='data'>
          {parseInt((new Date().getTime() - startupMS) / (1000 * 60 * 60))}h
        </div>
      </div>
      <div className='metric'>
        <div className='text'>Cache Hits:</div>
        <div className='data'>{cacheHits}</div>
      </div>
    </div>
  )
}

export default StatusBar
