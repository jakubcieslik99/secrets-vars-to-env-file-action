import * as core from '@actions/core';
import { writeFile } from 'fs/promises';

export default class EnvCreator {
  private hydrateRunnerEnv: boolean = true;
  private fileName: string | null = '.env';
  private overwriteScriptEnvs: boolean = true;
  private scriptEnvsToAppend: string[] = [];

  constructor(hydrateRunnerEnv: string, fileName: string, overwriteScriptEnvs: string, appendScriptEnvs: string[]) {
    this.hydrateRunnerEnv = !hydrateRunnerEnv || hydrateRunnerEnv === 'true' ? true : false;
    this.fileName = fileName === 'false' ? null : fileName ? fileName : '.env';
    this.overwriteScriptEnvs = !overwriteScriptEnvs || overwriteScriptEnvs === 'true' ? true : false;
    this.scriptEnvsToAppend = appendScriptEnvs.map(scriptEnv => scriptEnv.trim());
  }

  hydrateEnv(keys: Record<string, string>) {
    if (!this.hydrateRunnerEnv) return;

    for (const [key, value] of Object.entries(keys)) {
      if (process.env[key]) {
        if (this.overwriteScriptEnvs) {
          core.info(
            `Env variable "${key}" defined in your GitHub Actions script will be overwritten within this GitHub runner env`,
          );
        } else {
          core.info(
            `Skipped overwriting env variable "${key}" defined in your GitHub Actions script, within this GitHub runner env`,
          );
          continue;
        }
      }

      core.exportVariable(key, value);
      core.info(`Hydrated GitHub runner env with GitHub secret/var "${key}"`);
    }
  }

  async generateEnvFile(keys: Record<string, string>) {
    if (!this.fileName) return;

    const fileContent: [string, string | undefined][] = [];

    for (const env of this.scriptEnvsToAppend) {
      if (!process.env[env]) continue;

      if (keys[env]) {
        if (this.overwriteScriptEnvs) {
          core.info(
            `Env variable "${env}" defined in your GitHub Actions script will be overwritten when exporting to file`,
          );
          continue;
        } else {
          core.info(
            `Skipped overwriting env variable "${env}" defined in your GitHub Actions script, when exporting to file`,
          );
        }
      }

      fileContent.push([env, process.env[env]]);
      core.info(`Env variable "${env}" defined in your GitHub Actions script has been added to export to file`);
    }

    for (const [key, value] of Object.entries(keys)) {
      if (fileContent.find(([fileKey]) => fileKey === key)) continue;

      fileContent.push([key, value]);
      core.info(`GitHub secret/var "${key}" has been added to export to file`);
    }

    core.info(`Writing to file "${this.fileName}"...`);
    await writeFile(this.fileName, fileContent.map(([key, value]) => `${key}=${value}`).join('\n'));
    core.info(`File "${this.fileName}" has been filled and saved successfully`);
  }
}
