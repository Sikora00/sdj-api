module.exports = {
  name: 'backend-radio-core-application-services',
  preset: '../../../../../jest.config.js',
  coverageDirectory:
    '../../../../../coverage/libs/backend/radio/core/application-services',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: { 'ts-jest': { tsConfig: '<rootDir>/tsconfig.spec.json' } },
};
