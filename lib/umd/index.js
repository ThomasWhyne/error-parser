(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ErrorParser = {}));
}(this, (function (exports) { 'use strict';

  const STACK_FRAME_PATTERN = /^\(?(.+?)(?::(\d+))?(?::(\d+))?\)?$/;
  const STACK_FRAME_FILENAME_PATTERN = /.+\.(m?js|html?)$/;
  const STACK_FRAME_FUNCNAME_PATTERN = /^[^@]*@/;
  function stackToFrameArray(stack) {
      if (typeof stack !== 'string')
          return [];
      return stack
          .split('\n')
          .filter((sf) => STACK_FRAME_PATTERN.test(sf))
          .map((sf) => sf.replace(/^\s+/, '').split(/\s+/).pop());
  }
  function parseStack(stack) {
      const stackFrames = stackToFrameArray(stack);
      const errMsgStack = [];
      let sf, captured, filename, line, column;
      for (sf of stackFrames) {
          if (!(captured = STACK_FRAME_PATTERN.exec(sf)))
              continue;
          [, filename, line, column] = captured;
          errMsgStack.push({
              filename,
              line: parseInt(line) || 0,
              column: parseInt(column) || 0,
          });
      }
      return errMsgStack;
  }
  function isFilenamePattern(stackFrame) {
      return STACK_FRAME_FILENAME_PATTERN.test(stackFrame.filename);
  }
  function removeFuctionName(stackFrame) {
      stackFrame.filename = stackFrame.filename.replace(STACK_FRAME_FUNCNAME_PATTERN, '');
  }
  /**
   * @param { Error } err
   * @param { ParseErrorOption } option
   * @returns { ErrorMessage } ErrorMessage
   */
  function parseError(err, option = {}) {
      const { omitNoFilenameFrame = true, removeFrameFunctionName = true } = option;
      let stack = parseStack(err.stack);
      if (omitNoFilenameFrame)
          stack = stack.filter(isFilenamePattern);
      if (removeFrameFunctionName)
          stack.forEach(removeFuctionName);
      return {
          message: err.message,
          stack,
      };
  }

  exports.STACK_FRAME_FILENAME_PATTERN = STACK_FRAME_FILENAME_PATTERN;
  exports.STACK_FRAME_FUNCNAME_PATTERN = STACK_FRAME_FUNCNAME_PATTERN;
  exports.STACK_FRAME_PATTERN = STACK_FRAME_PATTERN;
  exports.parseError = parseError;
  exports.parseStack = parseStack;
  exports.stackToFrameArray = stackToFrameArray;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
