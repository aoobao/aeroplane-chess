import { useTHREE } from 'context/threejs'
import { createAnimation, useMount } from 'utils'
import { THREE } from 'utils/lib'

export const CubeTest = () => {
  const env = useTHREE()
  console.log('创建盒子')
  const geometry = new THREE.BoxGeometry()
  // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 })
  const cube = new THREE.Mesh(geometry, material)

  env.scene.add(cube)

  const euler = new THREE.Euler(0.5, 1, 1.57, 'XYZ')
  const q = new THREE.Quaternion().setFromEuler(euler)
  // createAnimation(cube.quaternion, quaternion, 2000)
  const obj = {
    x: cube.quaternion.x,
    y: cube.quaternion.y,
    z: cube.quaternion.z,
    w: cube.quaternion.w,
  }
  const tween = createAnimation(
    obj,
    {
      x: q.x,
      y: q.y,
      z: q.z,
      w: q.w,
    },
    2000,
  )

  tween.onUpdate(() => {
    cube.quaternion.set(obj.x, obj.y, obj.z, obj.w)
  })

  // cube.rotation.copy(euler)

  // cube.rotation.y = (80 * Math.PI) / 180
  // }, 2000)

  useMount(() => () => {
    console.log('销毁盒子')

    material.dispose()
    geometry.dispose()

    env.scene.remove(cube)
  })

  return null
}
