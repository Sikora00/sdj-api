module.exports = {
  name: 'ng-radio-feature',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/ng/radio/feature',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
