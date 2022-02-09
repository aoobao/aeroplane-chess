// import { useStatus } from 'context/stage'
import { THREEProvider } from 'context/threejs'
import { CubeTest } from './game/cube'
import { GridHelper } from './game/grid-helper'
// import { STAGE_STATUS } from 'utils/settings'

export const GameView = () => {
  // const { setStatus } = useStatus()
  return (
    <THREEProvider>
      <GridHelper />
      <CubeTest />
    </THREEProvider>
  )
}
