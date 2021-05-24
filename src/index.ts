export interface ErrorMessage {
  message: string;
  stack: Array<{
    line: number;
    column: number;
    filename: string;
  }>;
}

export type ParseErrorOption = {
  omitNoFilenameFrame?: boolean;
  removeFrameFunctionName?: boolean;
};

export const STACK_FRAME_PATTERN = /^\(?(.+?)(?::(\d+))?(?::(\d+))?\)?$/;
export const STACK_FRAME_FILENAME_PATTERN = /.+\.(m?js|html?)$/;
export const STACK_FRAME_FUNCNAME_PATTERN = /^[^@]*@/;

export function stackToFrameArray(stack: Error['stack']): string[] {
  if (typeof stack !== 'string') return [];
  return stack
    .split('\n')
    .filter((sf) => STACK_FRAME_PATTERN.test(sf))
    .map((sf) => sf.replace(/^\s+/, '').split(/\s+/).pop() as string);
}

export function parseStack(stack: Error['stack']): ErrorMessage['stack'] {
  const stackFrames = stackToFrameArray(stack);
  const errMsgStack: ErrorMessage['stack'] = [];
  let sf, captured, filename, line, column;
  for (sf of stackFrames) {
    if (!(captured = STACK_FRAME_PATTERN.exec(sf))) continue;
    [, filename, line, column] = captured;
    errMsgStack.push({
      filename,
      line: parseInt(line) || 0,
      column: parseInt(column) || 0,
    });
  }
  return errMsgStack;
}

function isFilenamePattern(stackFrame: ErrorMessage['stack'][number]): boolean {
  return STACK_FRAME_FILENAME_PATTERN.test(stackFrame.filename);
}
function removeFuctionName(stackFrame: ErrorMessage['stack'][number]): void {
  stackFrame.filename = stackFrame.filename.replace(
    STACK_FRAME_FUNCNAME_PATTERN,
    ''
  );
}

/**
 * @param { Error } err
 * @param { ParseErrorOption } option
 * @returns { ErrorMessage } ErrorMessage
 */
export function parseError(
  err: Error,
  option: ParseErrorOption = {}
): ErrorMessage {
  const { omitNoFilenameFrame = true, removeFrameFunctionName = true } = option;
  let stack = parseStack(err.stack);
  if (omitNoFilenameFrame) stack = stack.filter(isFilenamePattern);
  if (removeFrameFunctionName) stack.forEach(removeFuctionName);
  return {
    message: err.message,
    stack,
  };
}
