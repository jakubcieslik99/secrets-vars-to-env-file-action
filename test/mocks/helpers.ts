import { jest } from '@jest/globals';
import * as core from '@actions/core';

export const mockInputs = (coreModule: typeof core, inputs: { [key: string]: string }) => {
  (coreModule.getInput as jest.Mock).mockImplementation((name: unknown, options: unknown) => {
    if ((options as any)?.required && !inputs[name as string]) {
      throw new Error(`Input required and not supplied: ${name}`);
    }
    return inputs[name as string] || '';
  });
};

export const mockRunnerScriptEnvs = (coreModule: typeof core, runnerScriptEnvs: { [key: string]: string }) => {
  for (const [key, value] of Object.entries(runnerScriptEnvs)) {
    process.env[key] = value;
  }

  (coreModule.exportVariable as jest.Mock).mockImplementation((name: unknown, value: unknown) => {
    process.env[name as string] = value as string;
  });
};
