import { useTHREE } from 'context/threejs'
import { useMount } from 'utils'
import { THREE } from 'utils/lib'
export const GridHelper = () => {
  const env = useTHREE()
  useMount(() => {
    const gridHelper = new THREE.GridHelper(20, 20, 0x333333, 0x222222)

    const axesHelper = new THREE.AxesHelper(500)

    env.scene.add(axesHelper)
    env.scene.add(gridHelper)

    return () => {
      env.scene.remove(gridHelper)
    }
  })

  return <></>
}
