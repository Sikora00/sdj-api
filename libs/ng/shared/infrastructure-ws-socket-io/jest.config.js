module.exports = {
  name: 'ng-shared-infrastructure-ws-socket-io',
  preset: '../../../../jest.config.js',
  coverageDirectory:
    '../../../../coverage/libs/ng/shared/infrastructure-ws-socket-io',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
