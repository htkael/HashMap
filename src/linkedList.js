export class Node {
  constructor(key = null, value = null) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

export class LinkedList {
  constructor(key = null, value = null) {
    this.head = new Node(key, value);
  }

  append(key, value) {
    if (!this.head) {
      this.head = new Node(key, value);
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = new Node(key, value);
    }
  }

  prepend(key, value) {
    if (!this.head) {
      this.head = new Node(key, value);
    } else {
      let follow = this.head;
      this.head = new Node(key, value);
      this.head.next = follow;
    }
  }

  size() {
    if (!this.head) {
      return 0;
    } else {
      let current = this.head;
      let count = 1;
      while (current.next) {
        count++;
        current = current.next;
      }
      return count;
    }
  }

  getHead() {
    if (!this.head) {
      return null;
    } else {
      return this.head;
    }
  }

  tail() {
    if (!this.head) {
      return null;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      return current;
    }
  }

  at(index) {
    if (index === 0) {
      return this.getHead();
    } else {
      let current = this.head;
      for (let i = 0; i < index; i++) {
        if (current && current.next) {
          current = current.next;
        } else {
          current = null;
        }
      }
      if (current === null) {
        return null;
      } else return current;
    }
  }

  pop() {
    let last = this.size();
    let secondToLast = this.at(last - 2);
    secondToLast.next = null;
  }

  contains(value) {
    if (!this.head) {
      return null;
    } else {
      let current = this.head;
      while (current) {
        if (current.value === value) {
          return true;
        } else current = current.next;
      }
      return false;
    }
  }

  containsKey(key) {
    if (!this.head) {
      return null;
    } else {
      let current = this.head;
      while (current) {
        if (current.key === key) {
          return true;
        } else current = current.next;
      }
      return false;
    }
  }

  find(value) {
    if (!this.contains(value)) {
      return null;
    } else {
      let size = this.size();
      let current = this.head;
      for (let i = 0; i < size; i++) {
        if (current.value === value) {
          return i;
        } else current = current.next;
      }
    }
  }

  findKey(key) {
    if (!this.containsKey(key)) {
      return null;
    } else {
      let size = this.size();
      let current = this.head;
      for (let i = 0; i < size; i++) {
        if (current.key === key) {
          return i;
        } else current = current.next;
      }
    }
  }

  getValueFromKey(key) {
    let index = this.findKey(key);
    let node = this.at(index);
    return node.value;
  }

  toString() {
    let output = "";
    if (!this.head) {
      output = "No nodes exist";
      return output;
    } else {
      let current = this.head;
      output += `(${current.value})`;
      current = current.next;
      while (current) {
        output += ` -> (${current.value}) `;
        current = current.next;
      }
      output += " -> null";
      return output;
    }
  }

  insertAt(value, index) {
    if (index === 0) {
      this.prepend(value);
    } else {
      const follow = this.at(index);
      const before = this.at(index - 1);
      const insert = new Node(key, value);
      if (follow && before) {
        insert.next = follow;
        before.next = insert;
      } else if (before) {
        before.next = insert;
      } else {
        return null;
      }
    }
  }

  removeFromKey(key) {
    const index = this.findKey(key);
    if (index === 0) {
      this.head = this.head.next;
    }
    const follow = this.at(index + 1);
    const current = this.at(index);
    const before = this.at(index - 1);
    if (follow && before) {
      before.next = follow;
    }
  }

  keysIntoArray() {
    let keyArray = [];
    if (!this.head) {
      return keyArray;
    } else {
      let current = this.head;
      keyArray.push(current.key);
      current = current.next;
      while (current) {
        keyArray.push(current.key);
        current = current.next;
      }
      return keyArray;
    }
  }

  valuesIntoArray() {
    let valueArray = [];
    if (!this.head) {
      return valueArray;
    } else {
      let current = this.head;
      valueArray.push(current.value);
      current = current.next;
      while (current) {
        valueArray.push(current.value);
        current = current.next;
      }
      return valueArray;
    }
  }
}
