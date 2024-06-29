import * as core from '@actions/core';
import SecretsManager from './classes/SecretsManager.js';
import VarsManager from './classes/VarsManager.js';
import EnvCreator from './classes/EnvCreator.js';

export default (async () => {
  const secretsJson = core.getInput('secrets', { required: true });
  const varsJson = core.getInput('vars', { required: true });
  const includes = core.getInput('include') ? core.getInput('include').split(',') : [];
  const excludes = core.getInput('exclude') ? core.getInput('exclude').split(',') : [];
  const secretsPrefix = core.getInput('secrets-prefix');
  const varsPrefix = core.getInput('vars-prefix');

  const hydrateRunnerEnv = core.getInput('hydrate-env');
  const fileName = core.getInput('generate-file');
  const overwriteScriptEnvs = core.getInput('overwrite-script-envs');
  const appendScriptEnvs = core.getInput('append-script-envs') ? core.getInput('append-script-envs').split(',') : [];

  const secretsManager = new SecretsManager(secretsJson);
  secretsManager.applyIncludeFilter(includes);
  secretsManager.applyExcludeFilter(excludes);
  secretsManager.appendKeyPrefix(secretsPrefix);

  const varsManager = new VarsManager(varsJson);
  varsManager.applyIncludeFilter(includes);
  varsManager.applyExcludeFilter(excludes);
  varsManager.appendKeyPrefix(varsPrefix);

  const secrets = secretsManager.list;
  const vars = varsManager.list;

  const envCreator = new EnvCreator(hydrateRunnerEnv, fileName, overwriteScriptEnvs, appendScriptEnvs);
  envCreator.hydrateEnv({ ...secrets, ...vars });
  await envCreator.generateEnvFile({ ...secrets, ...vars });
})().catch(error => {
  if (error instanceof Error) core.setFailed(error.message);
  else core.setFailed(error);
});
