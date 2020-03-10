import * as React from 'react'

interface StatusBarProps {
  data: {
    keyCount: Number
    cacheHits: Number
    cacheMisses: Number
    startupMS: Number
    isOnline: boolean
  }
}

declare const StatusBar: React.FC<StatusBarProps>

export default StatusBar
