export class HashSet {
  constructor() {
    this.map = new HashMap();
  }

  add(key) {
    this.map.set(key, true);
  }

  has(key) {
    return this.map.has(key);
  }

  remove(key) {
    return this.map.remove(key);
  }

  clear() {
    this.map.clear();
  }

  keys() {
    return this.map.keys();
  }

  size() {
    return this.map.length();
  }
}
