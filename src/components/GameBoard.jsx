import React, { useCallback, useEffect, useRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import { init, runFuncOnCells } from '../utils/Init'
import MineBox from './MineBox'

const generateChildIds = (size) => {
  const ids = []
  runFuncOnCells(ids, size, (list, cord) => list.push(cord.toString()))
  return ids
}

const GameBoard = ({ size, mineNum, setFlagCount, setElapsedTime, setIconText }) => {
  const dict = useRef(init(size, mineNum)).current
  const childIds = useRef(generateChildIds(size)).current

  const secondsRef = useRef(0)
  const intervalRef = useRef(null)

  const startTimer = useCallback(() => {
    if (intervalRef.current) return
    intervalRef.current = setInterval(() => {
      secondsRef.current += 1
      setElapsedTime(secondsRef.current)
    }, 1000)
  }, [setElapsedTime])

  const stopTimer = useCallback(() => {
    clearInterval(intervalRef.current)
    intervalRef.current = null
  }, [])

  // Clean up timer on unmount
  useEffect(() => () => stopTimer(), [stopTimer])

  return (
    <mesh>
      <ambientLight intensity={0.6} color='lightblue' />
      <OrbitControls enablePan={false} minDistance={size} maxDistance={1.5 * size} />
      <pointLight intensity={0.8} position={[-2 * size, -2 * size, -2 * size]} color='purple' />
      <pointLight intensity={0.5} position={[2 * size, 2 * size, 2 * size]} color='red' />
      <MineBox
        size={size}
        mineNum={mineNum}
        dict={dict}
        childIds={childIds}
        startTimer={startTimer}
        stopTimer={stopTimer}
        setFlagCount={setFlagCount}
        setIconText={setIconText}
      />
    </mesh>
  )
}

export default GameBoard