import fs from 'fs';
import * as core from '@actions/core';
import { mockCoreModule } from './mocks/implementations.js';
import { mockInputs, mockRunnerScriptEnvs } from './mocks/helpers.js';

describe('secrets-vars-to-env-file-action e2e', () => {
  let coreModule: typeof core;
  let inputs: { [key: string]: string };
  let runnerScriptEnvs: { [key: string]: string };

  beforeAll(async () => {
    console.log('\x1b[1m\x1b[33m', 'Starting e2e test run...', '\x1b[0m');

    coreModule = await mockCoreModule();
  });

  beforeEach(async () => {
    inputs = {
      secrets: JSON.stringify({
        github_token: 'github_token',
        SECRET_1: 'secret_1',
        SECRET_2: 'secret_2',
        ENV_1: 'env_1_overwritten',
      }),
      vars: 'false',
      'hydrate-env': 'true',
      'generate-file': '.test.env',
      include: 'SECRET_1, ENV_1',
      exclude: 'SECRET_2',
      'overwrite-script-envs': 'true',
      'append-script-envs': 'ENV_1, ENV_3',
      'secrets-prefix': 'S_',
      'vars-prefix': 'V_',
    };

    runnerScriptEnvs = {
      S_ENV_1: 'env_1',
      ENV_2: 'env_2',
      ENV_3: 'env_3',
    };

    mockInputs(coreModule, inputs);
    mockRunnerScriptEnvs(coreModule, runnerScriptEnvs);
  });

  afterEach(() => {
    if (fs.existsSync(inputs['generate-file'])) {
      console.log(fs.readFileSync(inputs['generate-file'], 'utf-8'));
      fs.unlinkSync(inputs['generate-file']);
    }
  });

  afterAll(() => {
    console.log('\x1b[1m\x1b[32m', 'Finished e2e test run.', '\x1b[0m');
  });

  test('e2e', async () => {
    try {
      const { default: index } = await import('../index.js');
      await index;

      expect(true).toBe(true);
    } catch (error) {
      expect(error).toBeUndefined();
    }
  });
});
