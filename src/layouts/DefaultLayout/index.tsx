import { ReactNode } from 'react'
import { DefaultLayoutContainer } from './styled'

interface IDefaultLayout {
  children: ReactNode
}

export const DefaultLayout = ({children}: IDefaultLayout) => {
  return (
    <DefaultLayoutContainer>
      {children}
    </DefaultLayoutContainer>
  )
}
