class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
};
class Tree {
  constructor(arr) {
    this.arr = arr;
    this.root = this.buildTree(this.arr, 0, this.arr.length - 1);
    this.preorderArr = [];
    this.inorderArr = [];
    this.postorderArr = [];
    this.depths = 0;
  };

  // 0. clear the arrs
  clearArrs() {
    this.preorderArr = [];
    this.inorderArr = [];
    this.postorderArr = [];
  };

  // 1. build a binary tree from an array.
  buildTree(arr, start, end) {
    if (start > end) return null;

    let mid = parseInt((start + end) / 2);
    let root = new Node(arr[mid]);
    root.left = this.buildTree(arr, start, mid - 1);
    root.right = this.buildTree(arr, mid + 1, end);

    return root;
  };

  // 2. Insert value to the binary tree.
  insert(root = this.root, value) {
    if (root === null) {
      root = new Node(value);
      return root;
    };
    // given value is less than root, so we go left.
    if (root.data > value) {
      root.left = this.insert(root.left, value);
    };

    // given value is greater than root, so we go right.
    if (root.data < value) {
      root.right = this.insert(root.right, value);
    };

    return root;
  };

  // 3. Delete value from the binary tree.
  delete(root = this.root, value) {
    if (root === null) {
      return null;
    } else if (root.data < value) {
      root.right = this.delete(root.right, value);
    }  else if (root.data > value) {
      root.left = this.delete(root.left, value);
    } else {
      // 1. Node to be deleted is leaf node.
      if (root.left === null && root.right === null) {
        root = null;
        return root;
      // 2. Node to be deleted has only one child.
      } else if (root.left === null) {
        let temp = root;
        root = root.right;
        return root;
      } else if (root.right === null) {
        let temp = root;
        root = root.left;
        return root;
      // 3. Node to be deleted has two children.
      } else {
        let min = minVal(root.right);
        root.data = min;
        root.right = this.delete(root.right, min)

        return root;
      }
    }

    return root;
  };

  // 4. Find accepts a value and returns the node with the given value.
  find(root = this.root, value) {
    if (root === null) {
      return null;
    } else if (root.data === value) {
      return root;
    } else if (root.data > value) {
      return this.find(root.left, value);
    } else if (root.data < value) {
      return this.find(root.right, value);
    };
  };

  // 5. LevelOrder traverse the tree in breadth-first level
  levelOrder(root = this.root) {
    let queue = [];
    let result = [];

    if (root === null) return;
    queue.push(root);

    while (queue.length > 0) {
      let cur = queue.shift();

      if (cur.left !== null) {
        queue.push(cur.left);
      };

      if (cur.right !== null) {
        queue.push(cur.right);
      };

      result.push(cur.data);
    };

    return result;
  };
  
  // 6. Functions should traverse the tree in their respective depth-first order
  preorder(root = this.root) {
    if (root === null) return;

    this.preorderArr.push(root.data);

    this.preorder(root.left);
    this.preorder(root.right);

    return this.preorderArr;
  };

  inorder(root = this.root) {
    if (root === null) return;
    
    this.inorder(root.left);
    this.inorderArr.push(root.data);
    this.inorder(root.right);

    return this.inorderArr;
  };

  postorder(root = this.root) {
    if (root === null) return;

    this.postorder(root.left);
    this.postorder(root.right);
    this.postorderArr.push(root.data);

    return this.postorderArr;
  };

  // 7. Height accepts a node and returns its height.
  height(root = this.root) {
    if (root === null) {
        return null;
    } else {
        let left = this.height(root.left);
        let right = this.height(root.right);

        return Math.max(left, right) + 1;
    }
  };

  // 8. Depth accepts a node and returns its depth
  depth(root = this.root, node) {
    if (root === null) return;
    let cur;
    if (node) {
      cur = node.data;
    } else {
      return 'no such data exists.';
    }

    if (cur === node) {
      return cur;
    } else if (cur > root.data) {
      this.depth(root.right, node);
      this.depths++;
    } else if (cur < root.data) {
      this.depth(root.left, node);
      this.depths++;
    }

    return `The depth of the node is ${this.depths}`;
  };

  // 9. isBalanced checks if the tree is balanced
  isBalanced(root) {
    if (root === null) {
      return null;
    } else {
      let left = this.height(root.left);
      let right = this.height(root.right);

      let l = left + 1;
      let r = right + 1;
      let diff = l > r ? l - r : r - l;

      return diff < 1 ? 'The Binary Tree is Balanced.' : 'The Binary Tree is not Balanced.';
    }
  };

  // traversal method 
  traverse(root = this.root, arr) {
    arr.push(root.data);
    if (root.left !== null) {
        this.traverse(root.left, arr);
    };
    if (root.right !== null) {
        this.traverse(root.right, arr);
    };
    return arr;
  };

  // 10. function which rebalances an unbalanced tree
  rebalance() {
    let rebalancedNewTreeArray = [];
    rebalancedNewTreeArray = this.traverse(this.root, rebalancedNewTreeArray);

    let balancedTree = new Tree(rebalancedNewTreeArray);

    return balancedTree.root;
  };
};

function minVal(root) {
  let min = root.data;

  while (root !== null) {
    min = root.data;
    root = root.left;
  }

  return min;
};

function driverScript(arr) {
  // 1.initiating tree
  let newTree = new Tree(arr);

  // 2. building the tree
  const newTreeBuild = newTree.buildTree(arr, 0, arr.length - 1);

  // 3. confirm that the tree is balanced.
  const isthetreeBalanced = newTree.isBalanced(newTree.root);

  // 4, print out preorder, inorder & postorder.
  const preorder = newTree.preorder(newTree.root);
  const inorder = newTree.inorder(newTree.root);
  const postorder = newTree.postorder(newTree.root);

  console.log(preorder, inorder, postorder);

  // 5. unbalance the tree
  newTree.insert(newTree.root, 100);
  newTree.insert(newTree.root, 1002);

  // 6. confirm that the tree is unbalanced
  const unbalancedtree = newTree.isBalanced(newTree.root);

  // 7. balance the tree by calling rebalance
  const rebalanced = newTree.rebalance();

  // 8. confirm that the tree is balanced again.
  const balancedAgain = newTree.isBalanced(newTree.root);

  // 9. clearing arrs
  newTree.clearArrs();

  // 10. print out preorder, inorder & postorder.
  const preorder1 = newTree.preorder(newTree.root);
  const inorder1 = newTree.inorder(newTree.root);
  const postorder1 = newTree.postorder(newTree.root);

  console.log(preorder1, inorder1, postorder1);

  const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  };

  console.log(prettyPrint(rebalanced));

  return balancedAgain;
};

console.log(driverScript([0, 1, 2, 3, 4, 5, 6, 7, 8]));