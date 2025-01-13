import { LinkedList, Node } from "./linkedList";

class HashMap {
  constructor(capacity = 16, load = 0.75) {
    this.capacity = capacity;
    this.load = load;
    this.buckets = new Array(this.capacity).fill(null);
    this.size = 0;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity;
    }
    return hashCode;
  }

  set(key, value) {
    this.loadCheck();
    const code = this.hash(key);
    if (!this.buckets[code]) {
      this.buckets[code] = new LinkedList(key, value);
      this.size++;
      this.loadCheck();
    } else if (this.buckets[code].head.key === key) {
      this.buckets[code].head.value = value;
    } else {
      this.buckets[code].append(key, value);
      this.size++;
      this.loadCheck();
    }
  }

  get(key) {
    const code = this.hash(key);
    if (!this.buckets[code]) {
      return null;
    } else if ((this.buckets[code].head.key = key)) {
      return this.buckets[code].head.value;
    } else if (this.buckets[code].getValueFromKey(key)) {
      return this.buckets[code].getValueFromKey(key);
    } else return null;
  }

  has(key) {
    const code = this.hash(key);
    if (!this.buckets[code]) {
      return false;
    } else if (this.buckets[code].containsKey(key)) {
      return true;
    } else return false;
  }

  remove(key) {
    if (!this.has(key)) {
      return false;
    } else {
      const code = this.hash(key);
      if (this.buckets[code].head) {
        this.buckets[code] = null;
      } else {
        this.buckets[code].removeFromKey(key);
        this.size--;
        return true;
      }
    }
  }

  length() {
    let count = 0;
    this.buckets.forEach((bucket) => {
      if (bucket) {
        count += bucket.size();
      }
    });
    return count;
  }

  expand() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity).fill(null);
    this.size = 0;
    for (let bucket of oldBuckets) {
      if (bucket) {
        let current = bucket;
        while (current) {
          if (current.head) {
            this.set(current.head.key, current.head.value);
            current = current.head.next;
          } else {
            this.set(current.key, current.value);
            current = current.next;
          }
        }
      }
    }
  }

  loadCheck() {
    let check = this.size / this.capacity;
    if (check > this.load) {
      this.expand();
    }
  }

  clear() {
    this.buckets = new Array(this.capacity).fill(null);
  }

  keys() {
    let keyArray = [];
    this.buckets.forEach((bucket) => {
      if (bucket) {
        let bucketArray = bucket.keysIntoArray();
        bucketArray.forEach((key) => {
          keyArray.push(key);
        });
      }
    });
    return keyArray;
  }

  values() {
    let valueArray = [];
    this.buckets.forEach((bucket) => {
      if (bucket) {
        let bucketArray = bucket.valuesIntoArray();
        bucketArray.forEach((value) => {
          valueArray.push(value);
        });
      }
    });
    return valueArray;
  }

  entries() {
    let entryArray = [];
    this.buckets.forEach((bucket) => {
      if (!bucket) {
        return;
      } else {
        let first = bucket;
        while (first) {
          if (first.head) {
            let pair = [];
            pair.push(first.head.key);
            pair.push(first.head.value);
            entryArray.push(pair);
            first = first.head.next;
          } else {
            let pair = [];
            pair.push(first.key);
            pair.push(first.value);
            entryArray.push(pair);
            first = first.next;
          }
        }
      }
    });
    return entryArray;
  }
}

const test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

test.set("moon", "silver");
console.log(test.values());
