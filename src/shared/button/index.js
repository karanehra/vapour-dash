import React from 'react'
import './index.scss'

const AppButton = props => {
  const { title } = props
  delete props.title
  return <button {...props}>{title}</button>
}

export default AppButton
