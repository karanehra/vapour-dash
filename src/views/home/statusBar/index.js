import React from 'react'
import './index.scss'

const StatusBar = props => {
  const {
    data: { keyCount, cacheHits, cacheMisses, startupMS, isOnline }
  } = props

  const getCacheHitRatio = () => {
    return String(cacheHits / (cacheMisses + cacheHits)).substring(0, 5)
  }

  const getStartupHours = () => {
    return startupMS
      ? parseInt((new Date().getTime() - startupMS) / (1000 * 60 * 60))
      : '-'
  }

  return (
    <div className='status-bar-wrapper'>
      <div className='metric'>
        <div className='text'>Status:</div>
        <div className='data'>{isOnline ? 'Online' : 'Offline'}</div>
      </div>
      <div className='metric'>
        <div className='text'>Key Count:</div>
        <div className='data'>{isOnline ? keyCount : '-'}</div>
      </div>
      <div className='metric'>
        <div className='text'>Cache Hit Ratio:</div>
        <div className='data'>{isOnline ? getCacheHitRatio() : '-'}</div>
      </div>
      <div className='metric'>
        <div className='text'>Uptime:</div>
        <div className='data'>{isOnline ? `${getStartupHours()}h` : '-'}</div>
      </div>
      <div className='metric'>
        <div className='text'>Cache Hits:</div>
        <div className='data'>{cacheHits || '-'}</div>
      </div>
    </div>
  )
}

export default StatusBar
