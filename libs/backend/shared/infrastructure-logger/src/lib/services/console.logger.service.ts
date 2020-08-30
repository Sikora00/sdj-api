// tslint:disable: no-console
import { Logger } from '@nestjs/common';

export class ConsoleLogger extends Logger {
  log(message: any, context?: string): void {
    console.log(message);
  }
  error(message: any, trace?: string, context?: string): void {
    console.error(message, trace, context);
  }
  warn(message: any, context?: string): void {
    console.warn(message, context);
  }
}
