/* eslint-disable import/no-cycle */

import store from '@/store';
import { copyFileSync } from 'fs';

export enum LogLevel {
  DEBUG,
  INFO,
  ERROR,
  SILENT,
}

export class Logger {
  logLevel = LogLevel.DEBUG;
  lastLogLocation = '';
  currentlyInGroup = false;
  fontSize = '14px';

  // used for outer location group
  fileNameStyle = [
    `font-size: ${this.fontSize}`,
    'color: #90CAF9',
  ].join(';');

  colonStyle = [
    `font-size: ${this.fontSize}`,
    'color: white',
  ].join(';');

  functionNameStyle = [
    `font-size: ${this.fontSize}`,
    'color: #90CAF9',
  ].join(';');

  // used for inner message group
  pipeStyle = [
    `font-size: ${this.fontSize}`,
    'color: white',
  ].join(';');

  timeStyle = [
    `font-size: ${this.fontSize}`,
    'color: green',
  ].join(';');

  // text styles
  debugTextStyle = [
    `font-size: ${this.fontSize}`,
    'color: white',
  ].join(';');

  infoTextStyle = [
    `font-size: ${this.fontSize}`,
    'color: rgb(219, 212, 109)',
  ].join(';');

  errorTextStyle = [
    `font-size: ${this.fontSize}`,
    'color: rgb(219, 212, 109)',
    'background-color: rgb(90, 9, 18)',
  ].join(';');

  messageDetailStyle = [
    `font-size: ${this.fontSize}`,
    'color: orange',
  ].join(';');

  textStyles: Record<LogLevel, string> = {
    [LogLevel.DEBUG]: this.debugTextStyle,
    [LogLevel.INFO]: this.infoTextStyle,
    [LogLevel.ERROR]: this.errorTextStyle,
    [LogLevel.SILENT]: '',
  }

  constructor() {
    Error.stackTraceLimit = 20;
  }

  debug(message: any) {
    if (this.logLevel <= LogLevel.DEBUG) {
      const stack = new Error().stack!;
      this.logGrouped(message, stack, LogLevel.DEBUG);
    }
  }

  info(message: any) {
    if (this.logLevel <= LogLevel.INFO) {
      // if (typeof message === Object) {
      //   const messageString = JSON.stringify(Object.assign);
      // }

      const stack = new Error().stack!;
      this.logGrouped(message, stack, LogLevel.INFO);
    }
  }

  error(message: any) {
    if (this.logLevel <= LogLevel.ERROR) {
      const stack = new Error().stack!;
      this.logUngrouped(message, stack, LogLevel.ERROR);
    }
  }

  setLevel(level: LogLevel) {
    this.logLevel = level;
  }

  logGrouped(message: string, stack: string, logLevel: LogLevel) {
    // this function groups sequential logs based upon what function
    // they were called from

    // get file and function name by parsing stack trace
    const { fileName, functionName } = Logger.getStackDetails(stack);
    const location = logLevel + fileName + functionName;

    // if the log was from a different function as last log,
    // then end the group so we start a new group with the current location
    if (location !== this.lastLogLocation) {
      if (this.currentlyInGroup) {
        console.groupEnd();
      }

      // pad and format correctly
      const paddedLogLevel = Logger.padLogLevel(logLevel);
      const paddedFileName = Logger.rightPad(' ', fileName, 15);
      const paddedFunctionName = Logger.rightPad(' ', functionName, 10);
      const formattedLogLocation = Logger.formatLogLocation(paddedLogLevel, paddedFileName, paddedFunctionName);

      // create the collapsed location group
      console.group(formattedLogLocation,
        this.textStyles[logLevel],
        this.pipeStyle,
        this.fileNameStyle,
        this.colonStyle,
        this.functionNameStyle);
      this.currentlyInGroup = true;
      this.lastLogLocation = location;
    }

    // place the log message inside the location group
    if (typeof message === 'string') {
      const formattedMessage = Logger.formatMessage(message);
      console.groupCollapsed(formattedMessage,
        this.timeStyle,
        this.pipeStyle,
        this.textStyles[logLevel]);
    } else {
      console.groupCollapsed(message);
    }

    // place the stack trace inside the log message group
    console.groupCollapsed('%cStack Trace', this.messageDetailStyle);
    console.log(stack);
    console.groupEnd();

    // place the store state inside the log message group
    console.groupCollapsed('%cVuex Store', this.messageDetailStyle);
    console.log(JSON.parse(JSON.stringify(store.state)));
    console.groupEnd();

    console.groupEnd();
  }

  logUngrouped(message: string, stack: string, logLevel: LogLevel) {
    // this function always starts a new location group, regardless
    // of whether the last log was called from the same function

    // if we are currently inside a group, then end the group
    // so we can start a new group with the current location
    if (this.currentlyInGroup) {
      console.groupEnd();
    }

    // get file and function name by parsing stack trace
    const { fileName, functionName } = Logger.getStackDetails(stack);
    const location = fileName + functionName;

    // pad and format correctly
    const paddedLogLevel = Logger.padLogLevel(logLevel);
    const paddedFileName = Logger.rightPad(' ', fileName, 15);
    const paddedFunctionName = Logger.rightPad(' ', functionName, 10);
    const formattedLogLocation = Logger.formatLogLocation(paddedLogLevel, paddedFileName, paddedFunctionName);

    // create the uncollapsed location group
    console.group(formattedLogLocation,
      this.textStyles[logLevel],
      this.pipeStyle,
      this.fileNameStyle,
      this.colonStyle,
      this.functionNameStyle);

    // place the log message in the location group
    if (typeof message === 'string') {
      const formattedMessage = Logger.formatMessage(message);
      console.groupCollapsed(formattedMessage,
        this.timeStyle,
        this.pipeStyle,
        this.textStyles[logLevel]);
    } else {
      console.groupCollapsed(message);
    }

    // place the stack trace inside the log message group
    console.groupCollapsed('%cStack Trace', this.messageDetailStyle);
    console.log(stack);
    console.groupEnd();

    // place the store state inside the log message group
    console.groupCollapsed('%cVuex Store', this.messageDetailStyle);
    console.log(JSON.parse(JSON.stringify(store.state)));
    console.groupEnd();

    console.groupEnd();

    // end the group so we start a new line no matter what
    console.groupEnd();
    this.currentlyInGroup = false;
    this.lastLogLocation = location;
  }

  static padLogLevel(logLevel: LogLevel): string {
    return Logger.rightPad(' ', LogLevel[logLevel], 14);
  }

  static formatMessage(message: any) {
    const date = new Date();
    const hh = `0${date.getHours()}`.slice(-2);
    const mm = `0${date.getMinutes()}`.slice(-2);
    const ss = `0${date.getSeconds()}`.slice(-2);
    const ll = `0${date.getMilliseconds()}`.slice(-3);
    return `%c${hh}:${mm}:${ss}.${ll} %c| %c${message}`;
  }

  static formatLogLocation(paddedLogLevel: string, fileName: string, functionName: string) {
    return `%c${paddedLogLevel} %c| %c${fileName} %c: %c${functionName}`;
  }

  static rightPad(padChar: string, str: string, length: number): string {
    if (length > str.length) {
      const pad = padChar.repeat(length);
      return (str + pad).substring(0, length);
    }
    return str;
  }

  static getStackDetails(stack: string) {
    let file = '';
    let fn = '';
    try {
      const stackString = stack.split('\n');

      // find caller filename
      try {
        const lineComponents = stackString[2].split('/');
        const fileFinderRegex = /[^\W].*\.vue|[^\W].*\.ts|[^\W].*\.js/g;
        [file] = lineComponents[lineComponents.length - 1].match(fileFinderRegex)!;
      } catch {
        file = 'unknown file name';
      }

      // find caller function
      try {
        const functionFinderRegex = /(?<=at )(.*)(?= \()/g;
        if (stackString[2].includes('_callee$')) {
          const functionStackLine = stackString.filter((s: string) => {
            return s.includes('Object.') && !s.includes('Object.eval');
          });
          [fn] = [functionStackLine[0].match(functionFinderRegex)![0].split('.')[1]];
        } else {
          [fn] = [stackString[2].match(functionFinderRegex)![0].split('.')[1]];
        }
      } catch {
        fn = 'unknown function name';
      }
    } catch {
      file = 'unknown file name';
      return {
        fileName: file,
        functionName: fn,
      };
    }

    if (!file) { file = 'unknown file name'; }
    if (!fn) { fn = 'unknown function name'; }

    return {
      fileName: file,
      functionName: fn,
    };
  }
}

export const logger = new Logger();
