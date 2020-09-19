const fs = require('fs-extra');
const glob = require('glob');
const { createReporter } = require('istanbul-api');
const istanbulCoverage = require('istanbul-lib-coverage');

const reporter = createReporter();

/* [ Configuration ] */
const rootDir = './coverage';
const reportOut = './coverage';

const normalizeJestCoverage = (obj) => {
  const result = { ...obj };

  Object.entries(result)
    .filter(([k, v]) => v.data)
    .forEach(([k, v]) => {
      result[k] = v.data;
    });

  return result;
};

const mergeAllReports = (coverageMap, reports) => {
  if (Array.isArray(reports) === false) {
    return;
  }

  reports.forEach((reportFile) => {
    const coverageReport = fs.readJSONSync(reportFile);
    coverageMap.merge(normalizeJestCoverage(coverageReport));
  });
};

const findAllCoverageReports = (path, callback) => {
  glob(path, {}, (err, reports) => {
    callback(reports, err);
  });
};

const generateReport = (coverageMap, types) => {
  reporter.dir = reportOut;
  reporter.addAll(types || ['html', 'text']);
  reporter.write(coverageMap);
};

async function main() {
  const coverageMap = istanbulCoverage.createCoverageMap({});

  findAllCoverageReports(
    rootDir + '/**/coverage-final.json',
    (reports, err) => {
      if (Array.isArray(reports)) {
        mergeAllReports(coverageMap, reports);
        generateReport(coverageMap, ['lcov']);
      }
    }
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
