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
  const { shardData } = statusData

  const getStatus = async () => {
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
  }

  useEffect(() => {
    getStatus()
  }, [])

  return (
    <>
      <Header />
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
    </>
  )
}

export default Home
