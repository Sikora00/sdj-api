module.exports = {
  name: 'ng-radio-infrastructure-radio-ws',
  preset: '../../../../jest.config.js',
  coverageDirectory:
    '../../../../coverage/libs/ng/radio/infrastructure-radio-ws',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
