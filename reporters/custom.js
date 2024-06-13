const Mocha = require('mocha');
const fs = require('fs');
const path = require('path');
const safeStringify = require('fast-safe-stringify');

class CustomReporter extends Mocha.reporters.Base {
  constructor(runner) {
    super(runner);

    const results = {
      passes: [],
      failures: [],
      tests: []
    };

    runner.on('pass', function(test) {
      results.passes.push({
        title: test.title,
        fullTitle: test.fullTitle(),
        duration: test.duration,
        state: test.state
      });
      console.log(`Pass: ${test.fullTitle()}`);
    });

    runner.on('fail', function(test, err) {
      results.failures.push({
        title: test.title,
        fullTitle: test.fullTitle(),
        duration: test.duration,
        state: test.state,
        error: err.message
      });
      console.log(`Fail: ${test.fullTitle()}`);
    });

    runner.on('end', function() {
      results.tests = runner.suite.suites.reduce((acc, suite) => acc.concat(suite.tests.map(test => ({
        title: test.title,
        fullTitle: test.fullTitle(),
        duration: test.duration,
        state: test.state
      }))), []);
      
      const resultDir = path.join(__dirname, 'results');
      const resultFile = path.join(resultDir, 'custom-report.json');
      
      if (!fs.existsSync(resultDir)) {
        fs.mkdirSync(resultDir, { recursive: true });
      }
      
      fs.writeFileSync(resultFile, safeStringify(results, null, 2), 'utf-8');
      console.log('Test results written to', resultFile);
    });
  }
}

module.exports = CustomReporter;
