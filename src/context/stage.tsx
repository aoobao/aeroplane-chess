import { createContext, ReactNode, useContext, useState } from 'react'
import { settings, STAGE_STATUS } from 'utils/settings'

// export enum STAGE_STATUS {
//   Menu = 0, // 菜单页面
//   Wait = 5, // 等待中
//   PreStart = 8, // 上桌准备开始
//   Start = 10, // 进行中
//   GameOver = 15, // 结束
// }

interface IStage {
  status: STAGE_STATUS
  setStatus: (status: STAGE_STATUS) => void
}

export const StageContext = createContext<IStage | undefined>(undefined)

export const StageProvider = ({ children }: { children: ReactNode }) => {
  const defaultStatus = settings.defaultStageStatus

  const [status, setStatus] = useState<STAGE_STATUS>(defaultStatus)

  // const switchStatus = (status: STAGE_STATUS) => setStatus(status)

  return <StageContext.Provider children={children} value={{ status, setStatus }} />
}

export const useStatus = () => {
  const context = useContext(StageContext)
  if (!context) {
    throw new Error('未加载stage provider')
  } else {
    return context
  }
}
