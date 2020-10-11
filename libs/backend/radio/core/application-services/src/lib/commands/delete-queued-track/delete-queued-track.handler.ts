import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { QueuedTrackRepositoryInterface } from '@sdj/backend/radio/core/domain';
import { DeleteQueuedTrackCommand } from './delete-queued-track.command';

@CommandHandler(DeleteQueuedTrackCommand)
export class DeleteQueuedTrackHandler
  implements ICommandHandler<DeleteQueuedTrackCommand> {
  constructor(
    private readonly queuedTrackRepository: QueuedTrackRepositoryInterface
  ) {}

  async execute(command: DeleteQueuedTrackCommand): Promise<void> {
    const queuedTrack = await this.queuedTrackRepository.findOneOrFail(
      command.queuedTrackId
    );
    await this.queuedTrackRepository.remove(queuedTrack);
  }
}
