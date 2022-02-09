import { useStatus } from 'context/stage'
import { STAGE_STATUS } from 'utils/settings'

export const MenuView = () => {
  const { setStatus } = useStatus()

  return (
    <div className="flex-col">
      <h1>飞行棋游戏</h1>
      <button
        onClick={() => {
          setStatus(STAGE_STATUS.Wait)
        }}
      >
        进入游戏
      </button>
    </div>
  )
}
