interface Manager {
  list: Record<string, string>;
  applyIncludeFilter(includes: string[]): void;
  applyExcludeFilter(excludes: string[]): void;
  appendKeyPrefix(prefix: string): void;
}

export default Manager;
