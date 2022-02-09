export enum STAGE_STATUS {
  Menu = 0, // 菜单页面
  Wait = 5, // 等待中
  PreStart = 8, // 上桌准备开始
  Start = 10, // 进行中
  GameOver = 15, // 结束
}

export const settings = {
  defaultStageStatus: STAGE_STATUS.Start,
}
