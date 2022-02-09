import { StageProvider, useStatus } from 'context/stage'
import { STAGE_STATUS } from 'utils/settings'

export const StageView = () => {
  const { status } = useStatus()
  switch (status) {
    case STAGE_STATUS.Menu:
      const { MenuView } = require('./menu')
      return <MenuView />
    case STAGE_STATUS.Wait:
    case STAGE_STATUS.PreStart:
      const { RoomView } = require('./room')
      return <RoomView />
    case STAGE_STATUS.Start:
    case STAGE_STATUS.GameOver:
      const { GameView } = require('./game')
      return <GameView />
    default:
      return <></>
  }
}

export const MainView = () => {
  // const { status } = useStatus()
  return (
    <StageProvider>
      <StageView />
    </StageProvider>
  )
}
