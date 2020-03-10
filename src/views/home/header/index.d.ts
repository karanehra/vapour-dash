import * as React from 'react'

export interface HeaderProps {
  onRefresh: Function
  onGoLive: Function
}

declare const Header: React.FC<HeaderProps>

export default Header
