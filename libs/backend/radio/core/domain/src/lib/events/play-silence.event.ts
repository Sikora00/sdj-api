import { ICommand } from '@nestjs/cqrs';

/**
 * @ToDo rename to play radio
 */
export class PlaySilenceEvent implements ICommand {
  constructor(public channelId: string) {}
}
