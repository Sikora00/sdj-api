import { SlackChannel } from './slack-channel.interface';
/** @ToDo Move to application-services **/
export abstract class SlackApiService {
  abstract getChannelList(token: string): Promise<SlackChannel[]>;

  abstract getUserId(token: string): Promise<string>;
}
