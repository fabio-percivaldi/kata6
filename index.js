/* eslint-disable max-statements */
'use strict'
const turnRight = {
  'N': 'E',
  'S': 'O',
  'O': 'N',
  'E': 'S',
}
const turnLeft = {
  'N': 'O',
  'S': 'E',
  'O': 'S',
  'E': 'N',
}

function normalizeCommands(commands) {
  const commandsToReturn = []
  for (const command of commands) {
    const reg = command.match(/\d+/)
    if (reg) {
      const number = parseInt(reg[0])
      const [char] = command
      commandsToReturn.push(...new Array(number).fill(char))
    } else {
      commandsToReturn.push(command)
    }
  }
  return commandsToReturn
}

module.exports = function rover(params) {
  let { direction, fuel = 0 } = params
  const { initialPosition, commands, obstacles, holes } = params
  let mappedObstacles = []
  let mappedHoles = []
  if (obstacles) {
    mappedObstacles = obstacles.map(ob => ob.join(''))
  }
  if (holes) {
    mappedHoles = holes.map(ob => ob.join(''))
  }
  const actualCommands = normalizeCommands(commands)
  let currentPosition = JSON.parse(JSON.stringify(initialPosition))
  for (const command of actualCommands) {
    const nextPosition = JSON.parse(JSON.stringify(currentPosition))
    if (command === 'f' || command === 'b') {
      if (mappedHoles.includes(nextPosition.join(''))) {
        if (fuel > 0) {
          fuel -= 1
        } else {
          return nextPosition
        }
      }
      const multiplier = 'f' === command ? 1 : -1

      if (direction === 'N') {
        nextPosition[1] += Number(multiplier)
      }

      if (direction === 'S') {
        nextPosition[1] -= Number(multiplier)
      }

      if (direction === 'E') {
        nextPosition[0] += Number(multiplier)
      }

      if (direction === 'O') {
        nextPosition[0] -= Number(multiplier)
      }
    } else if (command === 'r') {
      direction = turnRight[direction]
    } else {
      direction = turnLeft[direction]
    }

    if (!mappedObstacles.includes(nextPosition.join(''))) {
      currentPosition = nextPosition
    }
  }
  return currentPosition
}

