const browserWindow = window || {};
const browserWindowEnv = browserWindow['__env'] || {};

export const environment: {
  apiUrl: string;
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
    production: false,
  },
};
