import CameraControls from 'camera-controls'
import { ThreeEnvironment } from 'context/threejs'
import { useEffect } from 'react'
import { THREE } from 'utils/lib'
import TWEEN from '@tweenjs/tween.js'

export const useMount = (mount: React.EffectCallback) => {
  useEffect(() => {
    return mount()
    // eslint-disable-next-line
  }, [])
}

export const initCameraAndControls = (env: ThreeEnvironment) => {
  env.camera = new THREE.PerspectiveCamera(45, env.width / env.height, 0.1, 10000)
  // env.camera.up.set(0, 0, 1)

  // env.camera.position.z = 10
  env.control = new CameraControls(env.camera, env.renderer.domElement)

  env.control.setLookAt(0, 12, 30, 0, 0, 0, false)
}

export function createAnimation<T>(from: T, to: T, duration?: number, easing: (amount: number) => number = TWEEN.Easing.Linear.None, callback?: () => void) {
  const tween = new TWEEN.Tween(from)
  tween.to(to, duration).easing(easing)

  tween.start()

  callback && tween.onComplete(callback)
  return tween
}
