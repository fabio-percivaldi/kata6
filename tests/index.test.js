'use strict'

const tap = require('tap')
const rover = require('../index')

tap.test('ROVER', t => {
  const tests = [
    {
      input: {
        initialPosition: [0, 0],
        direction: 'N',
        commands: ['f', 'f'],
      },
      expected: [0, 2],
    },
    {
      input: {
        initialPosition: [0, 0],
        direction: 'S',
        commands: ['f', 'f'],
      },
      expected: [0, -2],
    }, {
      input: {
        initialPosition: [0, 0],
        direction: 'E',
        commands: ['f', 'b'],
      },
      expected: [0, 0],
    },
    {
      input: {
        initialPosition: [0, 0],
        direction: 'O',
        commands: ['b', 'b'],
      },
      expected: [2, 0],
    },
    {
      input: {
        initialPosition: [0, 0],
        direction: 'N',
        commands: ['b', 'f', 'f'],
      },
      expected: [0, 1],
    },
  ]

  tests.forEach((test, index) => {
    t.test(`${index + 1}`, t => {
      const result = rover(test.input)
      t.strictSame(result, test.expected)
      t.end()
    })
  })
  t.end()
})

tap.test('TURNING ROVER', t => {
  const tests = [
    {
      input: {
        initialPosition: [0, 0],
        direction: 'N',
        commands: ['f', 'f', 'l', 'f', 'f'],
      },
      expected: [-2, 2],
    },
    {
      input: {
        initialPosition: [0, 0],
        direction: 'S',
        commands: ['f', 'f', 'r', 'r', 'f'],
      },
      expected: [0, -1],
    }, {
      input: {
        initialPosition: [0, 0],
        direction: 'E',
        commands: ['f', 'b', 'l', 'r', 'f', 'b'],
      },
      expected: [0, 0],
    },
    {
      input: {
        initialPosition: [0, 0],
        direction: 'O',
        commands: ['b', 'b', 'b', 'b', 'r', 'f'],
      },
      expected: [4, 1],
    },
    {
      input: {
        initialPosition: [2, 2],
        direction: 'N',
        commands: ['b', 'f', 'f', 'r', 'b'],
      },
      expected: [1, 3],
    },
  ]

  tests.forEach((test, index) => {
    t.test(`${index + 1}`, t => {
      const result = rover(test.input)
      t.strictSame(result, test.expected)
      t.end()
    })
  })
  t.end()
})

tap.test('MULTIPLE TURNING ROVER', t => {
  const tests = [
    {
      input: {
        initialPosition: [0, 0],
        direction: 'N',
        commands: ['f2', 'l', 'f2'],
      },
      expected: [-2, 2],
    },
    {
      input: {
        initialPosition: [0, 0],
        direction: 'S',
        commands: ['f2', 'r2', 'f'],
      },
      expected: [0, -1],
    }, {
      input: {
        initialPosition: [0, 0],
        direction: 'E',
        commands: ['f', 'b', 'l', 'r', 'f', 'b'],
      },
      expected: [0, 0],
    },
    {
      input: {
        initialPosition: [0, 0],
        direction: 'O',
        commands: ['b4', 'r', 'f'],
      },
      expected: [4, 1],
    },
    {
      input: {
        initialPosition: [2, 2],
        direction: 'N',
        commands: ['b', 'f2', 'r', 'b'],
      },
      expected: [1, 3],
    },
  ]

  tests.forEach((test, index) => {
    t.test(`${index + 1}`, t => {
      const result = rover(test.input)
      t.strictSame(result, test.expected)
      t.end()
    })
  })
  t.end()
})

tap.test('TURNING ROVER WITH OBSTACLES', t => {
  const tests = [
    {
      input: {
        initialPosition: [0, 0],
        obstacles: [[0, 1]],
        direction: 'N',
        commands: ['f2', 'l', 'f2'],
      },
      expected: [-2, 0],
    },
    {
      input: {
        initialPosition: [0, 0],
        direction: 'S',
        obstacles: [[0, -1], [0, 1]],
        commands: ['f2', 'r2', 'f'],
      },
      expected: [0, 0],
    }, {
      input: {
        initialPosition: [0, 0],
        obstacles: [],
        direction: 'E',
        commands: ['f', 'b', 'l', 'r', 'f', 'b'],
      },
      expected: [0, 0],
    },
    {
      input: {
        initialPosition: [2, 2],
        direction: 'N',
        obstacles: [[1, 3]],
        commands: ['b', 'f2', 'r', 'b'],
      },
      expected: [2, 3],
    },
  ]

  tests.forEach((test, index) => {
    t.test(`${index + 1}`, t => {
      const result = rover(test.input)
      t.strictSame(result, test.expected)
      t.end()
    })
  })
  t.end()
})

tap.test('TURNING ROVER WITH OBSTACLES AND HOLES', t => {
  const tests = [
    {
      input: {
        initialPosition: [0, 0],
        obstacles: [[0, 1]],
        holes: [[0, 0]],
        direction: 'N',
        commands: ['f2', 'l', 'f2'],
      },
      expected: [0, 0],
    },
    {
      input: {
        initialPosition: [0, 0],
        direction: 'S',
        obstacles: [[0, -1], [0, 1]],
        holes: [],
        commands: ['f2', 'r2', 'f'],
      },
      expected: [0, 0],
    },
    {
      input: {
        initialPosition: [0, 0],
        obstacles: [],
        holes: [[1, 0]],
        direction: 'E',
        commands: ['f', 'b', 'l', 'r', 'f', 'b'],
      },
      expected: [1, 0],
    },
    {
      input: {
        initialPosition: [2, 2],
        direction: 'N',
        obstacles: [[1, 3]],
        holes: [[2, 1]],
        commands: ['b', 'f2', 'r', 'b'],
      },
      expected: [2, 1],
    },
  ]

  tests.forEach((test, index) => {
    t.test(`${index + 1}`, t => {
      const result = rover(test.input)
      t.strictSame(result, test.expected)
      t.end()
    })
  })
  t.end()
})

tap.test('TURNING ROVER WITH OBSTACLES AND HOLES AND VINGARDIUM', t => {
  const tests = [
    {
      input: {
        initialPosition: [0, 0],
        obstacles: [[0, 1]],
        holes: [[0, 0]],
        fuel: 1,
        direction: 'N',
        commands: ['f2', 'l', 'f2'],
      },
      expected: [0, 0],
    },
    {
      input: {
        initialPosition: [0, 0],
        direction: 'S',
        obstacles: [[0, -1], [0, 1]],
        holes: [],
        fuel: 5,
        commands: ['f2', 'r2', 'f'],
      },
      expected: [0, 0],
    },
    {
      input: {
        initialPosition: [0, 0],
        obstacles: [],
        holes: [[1, 0]],
        fuel: 1,
        direction: 'E',
        commands: ['f', 'f', 'b', 'l', 'r', 'f', 'b'],
      },
      expected: [1, 0],
    },
    {
      input: {
        initialPosition: [0, 0],
        obstacles: [],
        holes: [[0, 1], [0, 2]],
        fuel: 1,
        direction: 'N',
        commands: ['f4'],
      },
      expected: [0, 2],
    },
  ]

  tests.forEach((test, index) => {
    t.test(`${index + 1}`, t => {
      const result = rover(test.input)
      t.strictSame(result, test.expected)
      t.end()
    })
  })
  t.end()
})
