const testPath = process.env.TEST_PATH || "tests/**/[!Errors]*.ts";

module.exports = {
  spec: [testPath],
  exclude: process.env.TEST_ERRORS ? "" : ".*Errors.test.ts",
  require: ["ts-node/register", "./tests/mochaFixtures.ts"],
  recursive: true,
  extension: [
    "ts"
  ]
};

