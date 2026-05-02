export const GAME_STATE = {
  IDLE: 'idle',       // not started yet
  RUNNING: 'running',
  OVER: 'over',
}

export const SIDES = [
  { position: [0, 0, 1],  rotation: [0, 0, 0],          fixedIdx: 2, sign:  1, pCord: [0, 1], flip: [1, 1, 1]  },
  { position: [0, 0, -1], rotation: [0, Math.PI, 0],     fixedIdx: 2, sign: -1, pCord: [0, 1], flip: [-1, 1, 1] },
  { position: [1, 0, 0],  rotation: [0, Math.PI/2, 0],   fixedIdx: 0, sign:  1, pCord: [2, 1], flip: [1, 1, -1] },
  { position: [-1, 0, 0], rotation: [0, -Math.PI/2, 0],  fixedIdx: 0, sign: -1, pCord: [2, 1], flip: [1, 1, 1]  },
  { position: [0, 1, 0],  rotation: [-Math.PI/2, 0, 0],  fixedIdx: 1, sign:  1, pCord: [0, 2], flip: [1, 1, -1] },
  { position: [0, -1, 0], rotation: [Math.PI/2, 0, 0],   fixedIdx: 1, sign: -1, pCord: [0, 2], flip: [1, 1, 1]  },
]

export const DIFFICULTIES = [[5, 25], [7, 60], [9, 111]]
export const DIFFICULTY_KEY = 'GAME_DIFFICULTY'
export const DIFFICULTY_LABELS = ['Beginner', 'Intermediate', 'Expert']