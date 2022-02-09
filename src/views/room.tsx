import { useStatus } from 'context/stage'
import { STAGE_STATUS } from 'utils/settings'

export const RoomView = () => {
  const { setStatus } = useStatus()

  return (
    <div>
      选择房间
      <button
        onClick={() => {
          setStatus(STAGE_STATUS.Start)
        }}
      >
        进入游戏
      </button>
    </div>
  )
}
