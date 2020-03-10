import * as React from 'react'

interface AppButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

declare const AppButton: React.FC<AppButtonProps>

export default AppButton
