module.exports = {
  errorInstanceByBrowser: {
    chrome: {
      name: 'Fixture Chrome',
      error: {
        name: 'TypeError',
        message: 'Error raised',
        stack: `TypeError: Error raised
  at bar http://192.168.31.8:8000/c.js:2:9
  at foo http://192.168.31.8:8000/b.js:4:15
  at calc http://192.168.31.8:8000/a.js:4:3
  at <anonymous>:1:11
  at http://192.168.31.8:8000/a.js:22:3
`,
      },
      expectation: {
        message: 'Error raised',
        stack: [
          { filename: 'http://192.168.31.8:8000/c.js', line: 2, column: 9 },
          { filename: 'http://192.168.31.8:8000/b.js', line: 4, column: 15 },
          { filename: 'http://192.168.31.8:8000/a.js', line: 4, column: 3 },
          // { filename: '<anonymous>', line: 1, column: 11 },
          { filename: 'http://192.168.31.8:8000/a.js', line: 22, column: 3 },
        ],
      },
    },
    firefox: {
      name: 'Fixture FireFox',
      error: {
        name: 'TypeError',
        message: 'Error raised',
        stack: `
  bar@http://192.168.31.8:8000/c.js:2:9
  foo@http://192.168.31.8:8000/b.js:4:15
  calc@http://192.168.31.8:8000/a.js:4:3
  <anonymous>:1:11
  http://192.168.31.8:8000/a.js:22:3
`,
      },
      expectation: {
        message: 'Error raised',
        stack: [
          {
            filename: 'http://192.168.31.8:8000/c.js',
            line: 2,
            column: 9,
          },
          {
            filename: 'http://192.168.31.8:8000/b.js',
            line: 4,
            column: 15,
          },
          {
            filename: 'http://192.168.31.8:8000/a.js',
            line: 4,
            column: 3,
          },
          // { filename: '<anonymous>', line: 1, column: 11 },
          { filename: 'http://192.168.31.8:8000/a.js', line: 22, column: 3 },
        ],
      },
    },
    node: {
      name: 'Fixture Node',
      error: {
        name: 'Error',
        message: 'node error',
        stack: `Error: node error
    at Object.<anonymous> (D:\workspace\leetcode-interview\error-parser\test\fixture.js:76:7)
    at Module._compile (internal/modules/cjs/loader.js:1063:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1092:10)
    at Module.load (internal/modules/cjs/loader.js:928:32)
    at Function.Module._load (internal/modules/cjs/loader.js:769:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:72:12)
    at internal/main/run_main_module.js:17:47`,
      },
      expectation: {
        message: 'node error',
        stack: [
          { filename: 'ixture.js', line: 76, column: 7 },
          {
            filename: 'internal/modules/cjs/loader.js',
            line: 1063,
            column: 30,
          },
          {
            filename: 'internal/modules/cjs/loader.js',
            line: 1092,
            column: 10,
          },
          {
            filename: 'internal/modules/cjs/loader.js',
            line: 928,
            column: 32,
          },
          {
            filename: 'internal/modules/cjs/loader.js',
            line: 769,
            column: 14,
          },
          { filename: 'internal/modules/run_main.js', line: 72, column: 12 },
          {
            filename: 'internal/main/run_main_module.js',
            line: 17,
            column: 47,
          },
        ],
      },
    },
  },
  stackFrames: [
    '  at bar http://192.168.31.8:8000/c.js:2:9',
    '  at <anonymous>:1:11',
    '  at http://192.168.31.8:8000/a.js:22:3',
    '  bar@http://192.168.31.8:8000/c.js:2:9',
    '  <anonymous>:1:11',
    '  http://192.168.31.8:8000/a.js:22:3',
    '    at Object.<anonymous> (D:workspaceleetcode-interviewerror-parser\test\fixture.js:76:7)',
    '    at internal/main/run_main_module.js:17:47',
  ],
};
