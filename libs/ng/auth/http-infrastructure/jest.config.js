module.exports = {
  name: 'ng-auth-http-infrastructure',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/ng/auth/http-infrastructure',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
