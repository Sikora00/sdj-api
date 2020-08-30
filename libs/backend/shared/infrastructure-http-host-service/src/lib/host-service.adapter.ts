import { Injectable } from '@nestjs/common';
import { HostService } from '@sdj/backend/shared/application-services';
import Axios from 'axios';

@Injectable()
export class HostServiceAdapter extends HostService {
  removeRadioStream(id: string): Promise<unknown> {
    return Axios.delete(
      `http://${process.env.HOST_IP}:8887/remove/${id}`
    ).catch(err => {});
  }

  startRadioStream(id: string): Promise<unknown> {
    return Axios.post(
      `http://${process.env.HOST_IP}:8887/start/${id}`
    ).catch(err => {});
  }

  nextSong(channelId: string): Promise<unknown> {
    return Axios.put(
      `http://${process.env.HOST_IP}:8887/next/${channelId}`
    ).catch(err => {});
  }
}
