import { jest } from '@jest/globals';

jest.unstable_mockModule('@actions/core', () => ({
  info: jest.fn(),
  setFailed: jest.fn(),
  getInput: jest.fn(),
  exportVariable: jest.fn(),
}));

export const mockCoreModule = async () => {
  const coreModule = await import('@actions/core');

  (coreModule.info as jest.Mock).mockImplementation((message: unknown) => {
    console.info(`INFO: ${message as string}`);
  });

  (coreModule.setFailed as jest.Mock).mockImplementation((message: unknown) => {
    if (message instanceof Error) throw new Error(message.message);
    else throw new Error(message as string);
  });

  return coreModule;
};
