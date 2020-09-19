import { Pipe, PipeTransform } from '@angular/core';
import { ExternalRadio, SourceType } from '@sdj/ng/radio/core/domain';
import { QueuedTrack } from '@sdj/shared/domain';

@Pipe({
  name: 'awesomePlayerTitle',
})
export class AwesomePlayerTitlePipe implements PipeTransform {
  transform(type: SourceType, ...args: any[]): unknown {
    switch (type) {
      case SourceType.ExternalRadio:
        return (args[1] as ExternalRadio)?.title || '';
      case SourceType.Station:
        return (args[0] as QueuedTrack)?.track.title || '';
      default:
        return '';
    }
  }
}
