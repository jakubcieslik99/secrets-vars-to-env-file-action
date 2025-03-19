import KeysManager from './KeysManager.js';

export default class VarsManager extends KeysManager {
  constructor(varsJson: string) {
    super();
    this.type = 'var';

    if (varsJson !== 'false') {
      try {
        this.keys = JSON.parse(varsJson);
      } catch (error) {
        throw new Error(
          'Could not parse GitHub vars. Make sure you have added the following input to this action: vars: ${{ toJSON(vars) }}',
        );
      }
    }
  }
}
