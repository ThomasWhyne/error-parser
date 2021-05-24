export interface ErrorMessage {
    message: string;
    stack: Array<{
        line: number;
        column: number;
        filename: string;
    }>;
}
export declare type ParseErrorOption = {
    omitNoFilenameFrame?: boolean;
    removeFrameFunctionName?: boolean;
};
export declare const STACK_FRAME_PATTERN: RegExp;
export declare const STACK_FRAME_FILENAME_PATTERN: RegExp;
export declare const STACK_FRAME_FUNCNAME_PATTERN: RegExp;
export declare function stackToFrameArray(stack: Error['stack']): string[];
export declare function parseStack(stack: Error['stack']): ErrorMessage['stack'];
/**
 * @param { Error } err
 * @param { ParseErrorOption } option
 * @returns { ErrorMessage } ErrorMessage
 */
export declare function parseError(err: Error, option?: ParseErrorOption): ErrorMessage;
