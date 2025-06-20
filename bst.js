class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree([...new Set(array)].sort((a, b) => a - b));
  }

  buildTree(array) {
    if (!array.length) return null;

    const mid = Math.floor(array.length / 2);
    const root = new Node(array[mid]);

    root.left = this.buildTree(array.slice(0, mid));
    root.right = this.buildTree(array.slice(mid + 1));

    return root;
  }

  insert(value, node = this.root) {
    if (!node) return new Node(value);

    if (value < node.data) {
      node.left = this.insert(value, node.left);
    } else if (value > node.data) {
      node.right = this.insert(value, node.right);
    }

    return node;
  }

  deleteItem(value, node = this.root) {
    if (!node) return null;

    if (value < node.data) {
      node.left = this.deleteItem(value, node.left);
    } else if (value > node.data) {
      node.right = this.deleteItem(value, node.right);
    } else {
      // Node with one or no child
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      // Node with two children: get inorder successor
      let minNode = node.right;
      while (minNode.left) minNode = minNode.left;

      node.data = minNode.data;
      node.right = this.deleteItem(minNode.data, node.right);
    }
    return node;
  }

  find(value, node = this.root) {
    if (!node || node.data === value) return node;
    if (value < node.data) return this.find(value, node.left);
    return this.find(value, node.right);
  }

  levelOrder(callback) {
    if (!callback) throw new Error('Callback function is required');

    const queue = [this.root];

    while (queue.length > 0) {
      const node = queue.shift();
      callback(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  inOrder(callback, node = this.root) {
    if (!callback) throw new Error('Callback function is required');
    if (node.left) this.inOrder(callback, node.left);
    callback(node);
    if (node.right) this.inOrder(callback, node.right);
  }

  preOrder(callback, node = this.root) {
    if (!callback) throw new Error('Callback function is required');
    callback(node);
    if (node.left) this.preOrder(callback, node.left);
    if (node.right) this.preOrder(callback, node.right);
  }

  postOrder(callback, node = this.root) {
    if (!callback) throw new Error('Callback function is required');
    if (node.left) this.postOrder(callback, node.left);
    if (node.right) this.postOrder(callback, node.right);
    callback(node);
  }

  height(node) {
    if (!node) return -1;
    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  depth(value, node = this.root, currentDepth = 0) {
    if (!node) return null;
    if (node.data === value) return currentDepth;
    if (value < node.data) return this.depth(value, node.left, currentDepth + 1);
    return this.depth(value, node.right, currentDepth + 1);
  }

  isBalanced(node = this.root) {
    if (!node) return true;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    );
  }

  rebalance() {
    const nodes = [];
    this.inOrder((node) => nodes.push(node.data));
    this.root = this.buildTree(nodes);
  }
}

// Utility function for visualization
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) return;
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

// Helper for random array generation
const getRandomArray = (size, max = 100) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * max));

// DRIVER SCRIPT
const array = getRandomArray(15);
const tree = new Tree(array);

console.log('Initial tree:');
prettyPrint(tree.root);
console.log('Is balanced?', tree.isBalanced());

console.log('\nLevel Order:');
tree.levelOrder((node) => console.log(node.data));

console.log('\nPre Order:');
tree.preOrder((node) => console.log(node.data));

console.log('\nPost Order:');
tree.postOrder((node) => console.log(node.data));

console.log('\nIn Order:');
tree.inOrder((node) => console.log(node.data));

// Unbalance the tree
tree.insert(101);
tree.insert(150);
tree.insert(120);
tree.insert(130);
tree.insert(160);

console.log('\nTree after unbalancing:');
prettyPrint(tree.root);
console.log('Is balanced?', tree.isBalanced());

// Rebalance
tree.rebalance();
console.log('\nTree after rebalancing:');
prettyPrint(tree.root);
console.log('Is balanced?', tree.isBalanced());

console.log('\nTraversals after rebalancing');
console.log('Level Order:');
tree.levelOrder((node) => console.log(node.data));

console.log('\nPre Order:');
tree.preOrder((node) => console.log(node.data));

console.log('\nPost Order:');
tree.postOrder((node) => console.log(node.data));

console.log('\nIn Order:');
tree.inOrder((node) => console.log(node.data));
