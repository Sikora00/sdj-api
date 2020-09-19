module.exports = {
  name: 'ng-shared-infrastructure-slack-api-http',
  preset: '../../../../jest.config.js',
  coverageDirectory:
    '../../../../coverage/libs/ng/shared/infrastructure-slack-api-http',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
