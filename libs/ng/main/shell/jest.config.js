module.exports = {
  name: 'ng-main-shell',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/ng/main/shell',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
