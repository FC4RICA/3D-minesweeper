import React, { useMemo } from 'react'
import Button from './Button'

const createPositions = (size) => {
  const offset = size % 2 === 0 ? size / 2 - 0.5 : Math.floor(size / 2)
  const positions = []
  for (let i = 0; i < size; i++)
    for (let j = 0; j < size; j++)
      positions.push([i - offset, j - offset, 0])
  return positions
}

const resolveCellName = (position, fixedCord, pCord, flipDirection) => {
  const cord = [0, 0, 0]
  cord[fixedCord[0]] = fixedCord[1]
  cord[pCord[0]] = position[0] * flipDirection[pCord[0]]
  cord[pCord[1]] = position[1] * flipDirection[pCord[1]]
  return { cord, cellName: cord.toString() }
}

const Side = ({ position, rotation, size, fixedCord, pCord, dict, flipDirection, revealed, flagged, onCellClick, onCellFlag }) => {
  const positions = useMemo(() => createPositions(size), [size])

  return (
    <mesh position={position} rotation={rotation}>
      {positions.map((pos, i) => {
        const { cord, cellName } = resolveCellName(pos, fixedCord, pCord, flipDirection)
        const cell = dict.get(cellName)

        return (
          <Button
            key={i}
            position={pos}
            cellName={cellName}
            cord={cord}
            isMined={cell.isMined}
            text={cell.adjacentMines}
            isRevealed={revealed.has(cellName)}
            isFlagged={flagged.has(cellName)}
            onCellClick={onCellClick}
            onCellFlag={onCellFlag}
          />
        )
      })}
    </mesh>
  )
}

export default Side