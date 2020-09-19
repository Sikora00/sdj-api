module.exports = {
  name: 'ng-shared-infrastructure-speech',
  preset: '../../../../jest.config.js',
  coverageDirectory:
    '../../../../coverage/libs/ng/shared/infrastructure-speech',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
