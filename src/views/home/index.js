import React, { useEffect } from 'react'
import Header from './header'
import './index.scss'
import StatusBar from './statusBar'
import { callGetVapourStatusApi, callGetVapourShardsApi } from '@utils/api'

const Home = () => {
  const [statusData, setStatusData] = React.useState({
    keyCount: 0,
    cacheHits: 0,
    cacheMisses: 0,
    startupMS: 0,
    shardData: {},
    isOnline: false
  })

  const getStatus = async () => {
    let res = await callGetVapourStatusApi()
    setStatusData({ ...statusData, isOnline: res.status === 200 })
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
          keyCount
        })
      }
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
      </div>
    </>
  )
}

export default Home
