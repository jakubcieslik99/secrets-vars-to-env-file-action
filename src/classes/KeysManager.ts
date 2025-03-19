import * as core from '@actions/core';
import Manager from '../interfaces/Manager.js';

export default class KeysManager implements Manager {
  protected type: 'secret' | 'var' = 'secret';
  protected keys: Record<string, string> = {};

  get list(): Record<string, string> {
    return this.keys;
  }

  applyIncludeFilter(includes: string[]) {
    const includesList = includes.map(include => include.trim());

    if (!includesList.length) return;

    const modifiedKeys: Record<string, string> = {};

    for (const [key, value] of Object.entries(this.keys)) {
      for (const include of includesList) {
        if (key === include || (key.startsWith(include) && include.endsWith('_'))) {
          modifiedKeys[key] = value;
          core.info(`Included GitHub ${this.type} "${key}"`);
          break;
        }
      }
    }

    if (Object.keys(modifiedKeys).length) {
      this.keys = modifiedKeys;
    }
  }

  applyExcludeFilter(excludes: string[]) {
    const excludesList = excludes.map(exclude => exclude.trim());

    excludesList.push('github_token');

    const modifiedKeys: Record<string, string> = this.keys;

    for (const key of Object.keys(this.keys)) {
      if (excludesList.includes(key)) {
        delete modifiedKeys[key];
        key !== 'github_token' && core.info(`Excluded GitHub ${this.type} "${key}"`);
      }
    }

    this.keys = modifiedKeys;
  }

  appendKeyPrefix(prefix: string) {
    if (!prefix) return;

    const prefixedKeys: Record<string, string> = {};

    for (const [key, value] of Object.entries(this.keys)) {
      prefixedKeys[`${prefix}${key}`] = value;
    }

    this.keys = prefixedKeys;
    core.info(`Prefixed GitHub ${this.type}s with "${prefix}"`);
  }
}
