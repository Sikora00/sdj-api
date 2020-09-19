(function (window) {
  window.__env = {
    apiUrl: '//{{backendUrl}}/api',
    backendUrl: '//{{backendUrl}}/',
    externalStream: '//{{externalStream}}',
    radioStreamUrl: '//{{radioStreamUrl}}/',
    slack: {
      clientId: '{{slackClientId}}',
      clientSecret: '{{slackClientSecret}}',
    },
    ...(window.__env || {}),
  };
})(this);
