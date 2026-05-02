import React, { useCallback, useEffect, useRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import { init, runFuncOnCells } from '../utils/Init'
import MineBox from './MineBox'

const generateChildIds = (size) => {
  const ids = []
  runFuncOnCells(ids, size, (list, cord) => list.push(cord.toString()))
  return ids
}

const GameBoard = ({ size, mineNum, setFlagCount, setElapsedTime, onGameOver }) => {
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
      <ambientLight intensity={0.6} />
      <ambientLight intensity={0.4} color={'aqua'} />
      <pointLight intensity={80 * size} color={'red'} position={[size + 5, size + 5, size + 5]} />
      <pointLight intensity={30 * size} color={'orange'} position={[-size - 5, -size - 5, -size - 5]} />
      <OrbitControls enablePan={false} minDistance={size} maxDistance={2 * size} />
      <MineBox
        size={size}
        mineNum={mineNum}
        dict={dict}
        childIds={childIds}
        startTimer={startTimer}
        stopTimer={stopTimer}
        setFlagCount={setFlagCount}
        onGameOver={onGameOver}
      />
    </mesh>
  )
}

export default GameBoard