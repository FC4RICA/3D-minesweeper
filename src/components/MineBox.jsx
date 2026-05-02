import React, { useCallback, useEffect, useRef, useState } from 'react'
import Side from './Side'

const GAME_STATE = {
  IDLE: 'idle',       // not started yet
  RUNNING: 'running',
  OVER: 'over',
}

const SIDES = [
  { position: [0, 0, 1],  rotation: [0, 0, 0],          fixedIdx: 2, sign:  1, pCord: [0, 1], flip: [1, 1, 1]  },
  { position: [0, 0, -1], rotation: [0, Math.PI, 0],     fixedIdx: 2, sign: -1, pCord: [0, 1], flip: [-1, 1, 1] },
  { position: [1, 0, 0],  rotation: [0, Math.PI/2, 0],   fixedIdx: 0, sign:  1, pCord: [2, 1], flip: [1, 1, -1] },
  { position: [-1, 0, 0], rotation: [0, -Math.PI/2, 0],  fixedIdx: 0, sign: -1, pCord: [2, 1], flip: [1, 1, 1]  },
  { position: [0, 1, 0],  rotation: [-Math.PI/2, 0, 0],  fixedIdx: 1, sign:  1, pCord: [0, 2], flip: [1, 1, -1] },
  { position: [0, -1, 0], rotation: [Math.PI/2, 0, 0],   fixedIdx: 1, sign: -1, pCord: [0, 2], flip: [1, 1, 1]  },
]

const MineBox = ({ size, mineNum, dict, childIds, startTimer, stopTimer, setFlagCount, setIconText }) => {
  const fixedCordVal = Math.floor(size / 2) + 1
  const half = size / 2

  const [revealed, setRevealed] = useState(() => new Set())
  const [flagged, setFlagged] = useState(() => new Set())
  const [gameState, setGameState] = useState(GAME_STATE.IDLE)

  const isFirstRender = useRef(true)
  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return }
    if (gameState === GAME_STATE.RUNNING) startTimer()
    else stopTimer()
  }, [gameState, startTimer, stopTimer])

  useEffect(() => {
    setFlagCount(mineNum - flagged.size)
  }, [flagged, mineNum, setFlagCount])

  // --- board logic ---

  const revealCells = useCallback((startCord) => {
    const toReveal = new Set()
    const stack = [startCord.toString()]

    while (stack.length > 0) {
      const cur = stack.pop()
      const cell = dict.get(cur)
      if (!cell || cell.isRevealed || flagged.has(cur)) continue

      toReveal.add(cur)
      cell.isRevealed = true

      if (cell.adjacentMines !== '') continue

      const nums = cur.split(',').map(Number)
      for (let i = -1; i <= 1; i++)
        for (let j = -1; j <= 1; j++)
          for (let k = -1; k <= 1; k++) {
            if (i === 0 && j === 0 && k === 0) continue
            const neighbor = [nums[0]+i, nums[1]+j, nums[2]+k].toString()
            if (dict.has(neighbor) && !toReveal.has(neighbor))
              stack.push(neighbor)
          }
    }

    setRevealed(prev => new Set([...prev, ...toReveal]))
  }, [dict, flagged])

  const revealAllMines = useCallback(() => {
    const mineNames = []
    dict.forEach((cell, name) => {
      if (cell.isMined) {
        cell.isRevealed = true
        mineNames.push(name)
      }
    })
    setRevealed(prev => new Set([...prev, ...mineNames]))
  }, [dict])

  const isWinning = useCallback(() => {
    for (const cell of dict.values())
      if (!cell.isMined && !cell.isRevealed) return false
    return true
  }, [dict])

  const handleCellClick = useCallback((cellName, cord) => {
    const cell = dict.get(cellName)
    if (!cell || cell.isRevealed || flagged.has(cellName)) return

    if (gameState === GAME_STATE.OVER) return  // ← block clicks after game ends
    if (gameState === GAME_STATE.IDLE) setGameState(GAME_STATE.RUNNING)

    if (cell.isMined) {
      setIconText('sentiment_very_dissatisfied')
      revealAllMines()
      setGameState(GAME_STATE.OVER)
      return
    }

    revealCells(cord)

    if (isWinning()) {
      setIconText('sentiment_very_satisfied')
      setGameState(GAME_STATE.OVER)
    }
  }, [dict, flagged, gameState, revealCells, revealAllMines, isWinning, setIconText])

  const handleCellFlag = useCallback((cellName) => {
    if (gameState !== GAME_STATE.RUNNING) return
    const cell = dict.get(cellName)
    if (!cell || cell.isRevealed) return

    setFlagged(prev => {
      const next = new Set(prev)
      if (next.has(cellName)) {
        next.delete(cellName)
        cell.isFlagged = false
      } else {
        if (next.size >= mineNum) return prev // can't exceed mine count
        next.add(cellName)
        cell.isFlagged = true
      }
      return next
    })
  }, [dict, gameState, mineNum])

  return (
    <mesh onClick={e => e.stopPropagation()} onContextMenu={e => e.stopPropagation()}>
      <boxGeometry attach='geometry' args={[size, size, size]} />
      <meshStandardMaterial attach='material' color='gray' />

      {SIDES.map((s, i) => (
        <Side
          key={i}
          position={s.position.map(v => v * half)}
          rotation={s.rotation}
          size={size}
          fixedCord={[s.fixedIdx, s.sign * fixedCordVal]}
          pCord={s.pCord}
          dict={dict}
          flipDirection={s.flip}
          revealed={revealed}
          flagged={flagged}
          onCellClick={handleCellClick}
          onCellFlag={handleCellFlag}
        />
      ))}
    </mesh>
  )
}

export default MineBox