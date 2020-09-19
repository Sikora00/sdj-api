module.exports = {
  name: 'ng-shared-kernel',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/ng/shared/kernel',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
