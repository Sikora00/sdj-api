import { CallHandler, Injectable, Logger } from '@nestjs/common';
import { User, UserRepositoryInterface } from '@sdj/backend/radio/core/domain';
import {
  ISlackInterceptor,
  SlackInterceptor,
  SlackMessage,
} from '@sikora00/nestjs-slack-bot';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserDataService } from './user-data.service';

@SlackInterceptor()
@Injectable()
export class AddUserInterceptor implements ISlackInterceptor {
  constructor(
    private logger: Logger,
    private userDataService: UserDataService,
    private userRepository: UserRepositoryInterface
  ) {}

  intercept(
    message: SlackMessage,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    return from(
      this.userRepository.findOne(message.user).then(async (user: User) => {
        let userProfile: any;
        if (!user) {
          try {
            userProfile = await this.userDataService.getUserData(message.user);

            if (!userProfile) {
              return;
            }
          } catch (e) {
            this.logger.error(e);
            return;
          }

          user = new User();
          user.id = message.user;
          user.name = userProfile.name;
          user.displayName = userProfile.profile.display_name;
          user.realName = userProfile.profile.real_name;

          await this.userRepository.save(user);
        }
      })
    ).pipe(switchMap(() => next.handle()));
  }
}
