module.exports = {
  name: 'ng-shared-presentation-players',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/ng/shared/presentation-players',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
