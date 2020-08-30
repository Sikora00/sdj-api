import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { QueuedTrackDomainRepository } from '@sdj/backend/radio/core/domain';
import { Store } from '../../ports/store.port';
import { DeleteQueuedTrackCommand } from './delete-queued-track.command';

@CommandHandler(DeleteQueuedTrackCommand)
export class DeleteQueuedTrackHandler
  implements ICommandHandler<DeleteQueuedTrackCommand> {
  constructor(
    private readonly queuedTrackRepository: QueuedTrackDomainRepository,
    private readonly storageService: Store
  ) {}

  async execute(command: DeleteQueuedTrackCommand): Promise<void> {
    const queuedTrack = await this.queuedTrackRepository.findOneOrFail(
      command.queuedTrackId
    );
    await this.storageService.removeFromQueue(queuedTrack);
    await this.queuedTrackRepository.remove(queuedTrack);
  }
}
