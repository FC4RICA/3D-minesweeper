import { memo, useRef, useState } from 'react'
import { RoundedBox, Text } from '@react-three/drei'
import { a } from '@react-spring/three'
import Flag from './Flag'

const Button = memo(({ position, cellName, cord, isMined, text, isRevealed, isFlagged, flagRotation, onCellClick, onCellFlag }) => {
  const mesh = useRef(null)

  const zPos = isRevealed ? -0.03 : 0
  const color = isRevealed
    ? (isMined ? 'pink' : 'darkgray')
    : isFlagged ? '#fbc286' : 'lightgray'

  return (
    <a.mesh
      ref={mesh}
      onClick={e => { e.stopPropagation(); onCellClick(cellName, cord) }}
      onContextMenu={e => { e.stopPropagation(); onCellFlag(cellName) }}
      position={[position[0], position[1], 0]}
      name={cellName}
    >
      <RoundedBox args={[0.96, 0.96, 0.1]} radius={0.05} position={[0, 0, zPos]}>
        <meshLambertMaterial attach='material' color={color} />
      </RoundedBox>
      <Text scale={[0.5, 0.5, 0.5]} position={[0, 0, 0.021]} font='/fonts/GoogleSansCode-VariableFont_MONO,wght.ttf'>
        {text}
      </Text>
      {isFlagged && <Flag size={1.5} rotation={flagRotation} />}
    </a.mesh>
  )
})

export default Button