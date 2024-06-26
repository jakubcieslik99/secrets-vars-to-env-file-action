import * as core from '@actions/core';

(async () => {
  core.info('Work in progress...');
})().catch(error => {
  if (error instanceof Error) core.setFailed(error.message);
  else core.setFailed(error);
});
