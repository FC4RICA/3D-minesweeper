import { describe, it, expect } from 'vitest'
import { init, runFuncOnCells } from '../utils/Init'

describe('runFuncOnCells', () => {
  it('visits the correct number of cells for a given size', () => {
    const size = 5
    const visited = []
    runFuncOnCells(visited, size, (list, cord) => list.push(cord.toString()))

    // a cube of size N has 6 faces, each with N*N cells
    expect(visited.length).toBe(6 * size * size)
  })

  it('does not visit the same cell twice', () => {
    const size = 5
    const visited = []
    runFuncOnCells(visited, size, (list, cord) => list.push(cord.toString()))

    const unique = new Set(visited)
    expect(unique.size).toBe(visited.length)
  })
})

describe('init', () => {
  it('returns a map with the correct number of cells', () => {
    const size = 5
    const dict = init(size, 25)
    expect(dict.size).toBe(6 * size * size)
  })

  it('places exactly the requested number of mines', () => {
    const mineNum = 25
    const dict = init(5, mineNum)
    let count = 0
    dict.forEach(cell => { if (cell.isMined) count++ })
    expect(count).toBe(mineNum)
  })

  it('every non-mined cell has a numeric or empty adjacentMines value', () => {
    const dict = init(5, 10)
    dict.forEach(cell => {
      if (!cell.isMined) {
        expect(cell.adjacentMines === '' || !isNaN(Number(cell.adjacentMines))).toBe(true)
      }
    })
  })

  it('adjacentMines count is accurate for a known layout', () => {
    // Run many times to catch statistical flukes in random mine placement
    for (let i = 0; i < 10; i++) {
      const dict = init(5, 25)
      dict.forEach((cell, name) => {
        if (cell.isMined) return
        const cord = name.split(',').map(Number)
        let expected = 0
        for (let x = -1; x <= 1; x++)
          for (let y = -1; y <= 1; y++)
            for (let z = -1; z <= 1; z++) {
              const neighbor = [cord[0]+x, cord[1]+y, cord[2]+z].toString()
              if (dict.has(neighbor) && dict.get(neighbor).isMined) expected++
            }
        const actual = cell.adjacentMines === '' ? 0 : Number(cell.adjacentMines)
        expect(actual).toBe(expected)
      })
    }
  })
})