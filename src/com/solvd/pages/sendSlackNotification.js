const fs = require('fs');
const axios = require('axios');

const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;
const testResultsFile = process.env.TEST_RESULTS_FILE;

if (!slackWebhookUrl || !testResultsFile) {
  console.error('Missing SLACK_WEBHOOK_URL or TEST_RESULTS_FILE environment variable.');
  process.exit(1);
}

fs.readFile(testResultsFile, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading test results file:', err);
    process.exit(1);
  }

  const results = JSON.parse(data);
  const passedTests = results.passes.length;
  const failedTests = results.failures.length;
  
  const message = {
    text: `Cypress Test Results:\nPassed: ${passedTests}\nFailed: ${failedTests}`
  };

  axios.post(slackWebhookUrl, message)
    .then(response => {
      console.log('Slack notification sent:', response.data);
    })
    .catch(error => {
      console.error('Error sending Slack notification:', error);
      process.exit(1);
    });
});
