import { IEvent } from '@nestjs/cqrs';

export class PlayQueuedTrackEvent implements IEvent {
  constructor(public queuedTrackId: number) {}
}
