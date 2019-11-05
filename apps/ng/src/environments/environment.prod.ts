const browserWindow = window || {};
const browserWindowEnv = browserWindow['__env'] || {};

export const environment: {
  backendUrl: string;
  externalStream: string;
  radioStreamUrl: string;
  slack: {
    clientId: string;
    clientSecret: string;
  };
  production: boolean;
} = {
  ...browserWindowEnv,
  ...{
    production: true
  }
};
