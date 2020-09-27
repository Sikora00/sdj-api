const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname + '/env.sample.js'), 'utf8', function (
  err: unknown,
  data: string
): void {
  if (err) {
    return console.log(err);
  }
  const result = data
    .replace(/{{backendUrl}}/g, process.env.BACKEND_URL)
    .replace(/{{radioStreamUrl}}/g, process.env.RADIO_STREAM_URL)
    .replace(/{{externalStream}}/g, process.env.NG_EXTERNAL_STREAM)
    .replace(/{{slackClientId}}/g, process.env.SLACK_CLIENT_ID)
    .replace(/{{slackClientSecret}}/g, process.env.SLACK_CLIENT_SECRET);

  fs.writeFile(path.join(__dirname + '/env.js'), result, 'utf8', function (
    error: unknown
  ): void {
    if (error) return console.log(error);
  });
});
