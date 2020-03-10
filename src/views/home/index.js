import React, { useEffect } from 'react'
import { callGetVapourStatusApi, callGetVapourShardsApi } from '@utils/api'
import Header from './header'
import StatusBar from './statusBar'
import './index.scss'

const Home = () => {
  const [statusData, setStatusData] = React.useState({
    keyCount: 0,
    cacheHits: 0,
    cacheMisses: 0,
    startupMS: 0,
    shardData: {},
    isOnline: false
  })
  const [loading, setLoading] = React.useState(false)
  const [liveStatus, setLiveStatus] = React.useState(false)
  const { shardData } = statusData

  let liveWS

  const getStatus = async () => {
    setLoading(true)
    let res = await callGetVapourStatusApi()
    if (res.status === 200) {
      let shardsResp = await callGetVapourShardsApi()
      let {
        status,
        data: {
          shards: shardData,
          totalKeyCount: keyCount,
          hits: cacheHits,
          misses: cacheMisses,
          startupMS
        }
      } = shardsResp
      if (status === 200) {
        setStatusData({
          ...statusData,
          cacheHits,
          cacheMisses,
          startupMS,
          shardData,
          keyCount,
          isOnline: res.status === 200
        })
      }
    } else {
      setStatusData({ ...statusData, isOnline: false })
    }
    setLoading(false)
  }

  useEffect(() => {
    getStatus()
  }, [])

  const goLive = () => {
    liveWS = new WebSocket('ws://localhost:9000')
    liveWS.onopen = onConnectedHandler
    liveWS.onerror = onErrorHandler
    liveWS.onmessage = onMessageReceiveHandler
  }

  const onConnectedHandler = () => {
    console.log('connected to ws')
    liveWS.send('data')
  }
  const onErrorHandler = err => {
    console.log(err)
  }
  const onMessageReceiveHandler = event => {
    console.log(event)
  }

  return (
    <>
      <Header onRefresh={getStatus} onGoLive={goLive} />
      {loading ? (
        <div>Loadng</div>
      ) : (
        <div className='dataview-wrapper'>
          <StatusBar data={statusData} />
          <div className='shard-cells'>
            {Object.keys(statusData.shardData).map((shardID, i) => (
              <div
                className={shardData[shardID] ? 'cell filled' : 'cell'}
                key={i}
              >
                <div>{shardData[shardID] || '0'}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Home
