const fixture = require('./fixture');
const {
  parseError,
  parseStack,
  STACK_FRAME_PATTERN,
  STACK_FRAME_FILENAME_PATTERN,
  STACK_FRAME_FUNCNAME_PATTERN,
} = require('../lib/cjs');


const stackFrames = [];

describe('Test Patterns', () => {
  describe(`stack frame pattern: ${STACK_FRAME_PATTERN} to match all stack frames`, () => {
    fixture.stackFrames.forEach((sf) => {
      it(sf, () => expect(STACK_FRAME_PATTERN.test(sf)).toBe(true));
    });
  });
});

describe('Test @parseError', () => {
  Object.values(fixture.errorInstanceByBrowser).forEach((errIns) => {
    const { name, error, expectation } = errIns;
    describe(name, () => {
      const errorMessage = parseError(error);
      it(`parsed error message to be: "${expectation.message}"`, () =>
        expect(errorMessage.message).toBe(expectation.message));
      it(`parsed stack length to be: ${expectation.stack.length}`, () =>
        expect(errorMessage.stack.length).toBe(expectation.stack.length));
      errorMessage.stack.forEach((sf, idx) => {
        it(`parsed stack frame NO.${idx + 1} to be: ${JSON.stringify(
          expectation.stack[idx]
        )}`, () => expect(sf).toEqual(expectation.stack[idx]));
      });
    });
  });
});
