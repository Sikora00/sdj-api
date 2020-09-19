import { Injectable } from '@angular/core';
import { ExternalRadio, ExternalRadioGroup } from '@sdj/ng/radio/core/domain';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ExternalRadioFacade {
  externalRadioGroups$ = new BehaviorSubject(externalRadios);
  selectedExternalRadio$ = new BehaviorSubject(null);

  select(radio: ExternalRadio): void {
    this.selectedExternalRadio$.next(radio);
  }
}

const externalRadios: ExternalRadioGroup[] = [
  {
    title: 'Various',
    radios: [
      {
        title: 'Radio Zet',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/commons/4/4b/Radio_ZET_logo.png',
        url: 'https://n-4-14.dcs.redcdn.pl/sc/o2/Eurozet/live/audio.livx'
      },
      {
        title: 'RMF FM',
        url: 'http://rmfstream2.interia.pl:8000/rmf_fm',
        iconUrl:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/RMF_FM_logo.svg/1200px-RMF_FM_logo.svg.png'
      },
      {
        title: 'Anty Radio',
        url: 'https://an.cdn.eurozet.pl/ant-waw.mp3',
        iconUrl: 'https://bi.im-g.pl/im/b1/99/10/z17406641IBG,Antyradio.jpg'
      },
      {
        title: 'Rock Radio',
        url: 'https://stream.open.fm/202',
        iconUrl: 'https://open.fm/logo/200x200/202'
      },
      {
        title: 'Radio Złote Przeboje',
        url: 'https://stream.open.fm/201',
        iconUrl: 'https://open.fm/logo/200x200/201'
      },
      {
        title: 'Radio TOK FM',
        url: 'https://stream.open.fm/200',
        iconUrl: 'https://open.fm/logo/200x200/200'
      }
    ]
  },
  // {
  //   title: 'Eska Go',
  //   radios: [
  //     {
  //       title: 'VOX FM',
  //       url: 'https://waw01-04.ic.smcdn.pl/t049-1.aac?timestamp=1586121159&hash=7d72a2bc0919ea702ab2258519c6fc17aa6c7f8cdacf72b6b5bf9abe64a0bd88&rip=195.191.162.145&chstr=1281b0e8c9a12a8f657164885b4726297c8be3fb0a0be4e6ac84d2107cf7bf71',
  //       iconUrl:
  //         'https://static.wirtualnemedia.pl/media/top/voxfm-logo.png'
  //     },
  //     {
  //       title: 'Eska',
  //       url: 'https://waw01-04.ic.smcdn.pl/t042-1.aac?timestamp=1586121932&hash=aeb938b8b9cafcb17a6e919a59d221079277bc312c6568ac104af078de740f78&rip=195.191.162.145&chstr=5af2050fa41fa481e0f1548b25728a8276ccd6eeaa5b23df9dbba1b75cfad508',
  //       iconUrl: 'https://cdn.galleries.smcloud.net/t/galleries/gf-ZQnE-odXZ-zK9D_radio-eska-online-czestotliwosc-jak-sluchac-radia-eska-664x442-nocrop.jpg'
  //     }, {
  //       title: 'Eska Rock',
  //       url: 'https://waw01-01.ic.smcdn.pl/t041-1.aac?timestamp=1586122120&hash=fb08bfc2d480ffc600ff01a4641729dc1d4e8ea48a0cc0c722a4cc69c9059ee1&rip=195.191.162.145&chstr=571dc56718fd147af407514c12ad9545adbe2b2bf242bf195668f96c95bfb045',
  //       iconUrl: 'https://upload.wikimedia.org/wikipedia/en/7/7b/Radio_ESKA_Rock_PL.jpg'
  //     }
  //   ]
  // },
  {
    title: 'Open FM',
    radios: [
      {
        title: 'Impreza',
        url: 'https://stream.open.fm/2',
        iconUrl: 'https://open.fm/logo/200x200/2'
      },
      {
        title: '100% Hits',
        url: 'https://stream.open.fm/64',
        iconUrl: 'https://open.fm/logo/200x200/64'
      },
      {
        title: 'Work',
        url: 'https://stream.open.fm/109',
        iconUrl: 'https://open.fm/logo/200x200/109'
      },
      {
        title: 'Top Wszech Czasów - Rock',
        url: 'https://stream.open.fm/153',
        iconUrl: 'https://open.fm/logo/200x200/153'
      },
      {
        title: 'Polski Rock',
        url: 'https://stream.open.fm/29',
        iconUrl: 'https://open.fm/logo/200x200/29'
      }
    ]
  }
];
