export class HashMap {
  constructor(initialCapacity = 16, loadFactor = 0.75) {
    this.capacity = initialCapacity;
    this.loadFactor = loadFactor;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.sizeCount = 0;
  }

  _hash(key) {
    let hashCode = 0;
    const prime = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (prime * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  _resize() {
    this.capacity *= 2;
    const oldBuckets = this.buckets;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.sizeCount = 0;

    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }

  set(key, value) {
    const index = this._hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        return;
      }
    }

    bucket.push([key, value]);
    this.sizeCount++;

    if (this.sizeCount / this.capacity > this.loadFactor) {
      this._resize();
    }
  }

  get(key) {
    const index = this._hash(key);
    const bucket = this.buckets[index];

    for (const [k, v] of bucket) {
      if (k === key) return v;
    }
    return null;
  }

  has(key) {
    return this.get(key) !== null;
  }

  remove(key) {
    const index = this._hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.sizeCount--;
        return true;
      }
    }
    return false;
  }

  length() {
    return this.sizeCount;
  }

  clear() {
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.sizeCount = 0;
  }

  keys() {
    const keys = [];
    for (const bucket of this.buckets) {
      for (const [k] of bucket) {
        keys.push(k);
      }
    }
    return keys;
  }

  values() {
    const values = [];
    for (const bucket of this.buckets) {
      for (const [, v] of bucket) {
        values.push(v);
      }
    }
    return values;
  }

  entries() {
    const entries = [];
    for (const bucket of this.buckets) {
      for (const pair of bucket) {
        entries.push(pair);
      }
    }
    return entries;
  }
}
