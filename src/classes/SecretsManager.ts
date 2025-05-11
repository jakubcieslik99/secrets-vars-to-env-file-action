import KeysManager from './KeysManager.js';

export default class SecretsManager extends KeysManager {
  constructor(secretsJson: string) {
    super();
    this.type = 'secret';

    if (secretsJson !== 'false') {
      try {
        this.keys = JSON.parse(secretsJson);
      } catch (_error) {
        throw new Error(
          'Could not parse GitHub secrets. Make sure you have added the following input to this action: secrets: ${{ toJSON(secrets) }}',
        );
      }
    }
  }
}
