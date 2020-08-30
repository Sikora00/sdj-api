module.exports = {
  name: 'backend-shared-infrastructure-http-host-service',
  preset: '../../../../jest.config.js',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
  coverageDirectory:
    '../../../../coverage/libs/backend/shared/infrastructure-http-host-service'
};
