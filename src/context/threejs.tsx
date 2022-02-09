import styled from '@emotion/styled'
import React, { createContext, ReactNode, useContext, useRef, useState } from 'react'
import { initCameraAndControls, useMount } from 'utils'
// import * as THREE from 'three'
import { THREE } from 'utils/lib'
import TWEEN from '@tweenjs/tween.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import CameraControls from 'camera-controls'

export interface ThreeEnvironment {
  domElement: HTMLElement
  width: number
  height: number
  scene: THREE.Scene
  renderer: THREE.WebGLRenderer
  raycaster: THREE.Raycaster
  clock: THREE.Clock
  composer?: EffectComposer
  camera?: THREE.PerspectiveCamera
  control?: CameraControls
}

export function createThreeEnvironment(dom: HTMLElement, rendererParameters: THREE.WebGLRendererParameters = { antialias: true, alpha: true }) {
  const env: ThreeEnvironment = {
    domElement: dom,
    width: dom.offsetWidth,
    height: dom.offsetHeight,
    scene: new THREE.Scene(),
    raycaster: new THREE.Raycaster(),
    clock: new THREE.Clock(),
    renderer: new THREE.WebGLRenderer(rendererParameters),
  }

  env.renderer.setPixelRatio(window.devicePixelRatio)
  env.renderer.setSize(dom.offsetWidth, dom.offsetHeight)
  dom.appendChild(env.renderer.domElement)

  return env
}

export const THREEContext = createContext<ThreeEnvironment | undefined>(undefined)
THREEContext.displayName = 'three-environment'

export const THREEProvider = ({ children }: { children: ReactNode }) => {
  const wrap = useRef<HTMLDivElement>(null)
  const [isCreated, setIsCreated] = useState(false)
  // const [env, setEnv] = useState<ThreeEnvironment | undefined>(undefined)
  const envRef = useRef<ThreeEnvironment | undefined>(undefined)

  const lightRef = useRef<THREE.DirectionalLight | undefined>(undefined)

  const resetSize = () => {
    const dom = wrap.current
    const env = envRef.current
    if (!dom) return
    if (!env) {
      debugger
      throw new Error('error')
    }
    env.width = dom.offsetWidth
    env.height = dom.offsetHeight

    if (env.camera) {
      env.camera.aspect = env.width / env.height
      env.camera.updateProjectionMatrix()
    }

    env.renderer.setSize(env.width, env.height)
    env.composer && env.composer.setSize(env.width, env.height)
  }

  const initLight = (env: ThreeEnvironment) => {
    // 环境光
    const light = new THREE.AmbientLight(0x404040, 0.5)
    light.name = 'ambient-light'

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444)
    hemiLight.position.set(0, 20, 0)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    if (env && env.camera) {
      const { x, y, z } = env.camera!.position
      directionalLight.position.set(x, y, z)
    }

    lightRef.current = directionalLight

    env?.scene.add(light, hemiLight, directionalLight)
  }

  useMount(() => {
    const dom = wrap.current!
    let tick = 0
    const e = createThreeEnvironment(dom)

    envRef.current = e

    // 初始化照相机和轨道控制器
    initCameraAndControls(e)

    initLight(e)

    window.addEventListener('resize', resetSize)

    const render = (timer: number) => {
      tick = requestAnimationFrame(render)
      TWEEN.update(timer)
      const env = e
      if (!env) return
      const delta = e.clock.getDelta()
      if (env.control && env.camera) {
        const hasUpdated = env.control.update(delta)
        if (hasUpdated) {
          // TODO
          // const camera = env.camera
          // console.log(`${camera.position.x},${camera.position.y},${camera.position.z}`)
        }

        if (env.composer) {
          env.composer.render(delta)
        } else {
          env.renderer.render(env.scene, env.camera)
        }
      }
    }

    setIsCreated(true)

    tick = requestAnimationFrame(render)

    return () => {
      console.log('销毁环境')
      window.removeEventListener('resize', resetSize)
      cancelAnimationFrame(tick)
      tick = 0
      const env = envRef.current
      if (env) {
        env.scene.clear()
        wrap.current && wrap.current.removeChild(env.renderer.domElement)
      }
    }
  })

  const child = isCreated ? children : undefined

  return (
    <Container ref={wrap}>
      <THREEContext.Provider value={envRef.current}>{child}</THREEContext.Provider>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`
export const useTHREE = () => {
  const context = useContext(THREEContext)
  if (!context) {
    throw new Error('未加载three provider')
  } else {
    return context
  }
}
