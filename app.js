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

  // preorder: root left right
  // inroder: left root right
  // postorder: left right root 

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
  height(node) {
    
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


let array = [1, 2, 3, 6, 7, 8, 9];

const newTree = new Tree(array);

console.log(newTree.root);
console.log(newTree.insert(newTree.root, 5));
console.log(newTree.insert(newTree.root, 100));
console.log(newTree.insert(newTree.root, 0));
console.log(newTree.delete(newTree.root, 3));
console.log(newTree.delete(newTree.root, 2));
console.log(newTree.find(newTree.root, 5));
console.log(newTree.find(newTree.root, 6));
console.log(newTree.find(newTree.root, 100));
console.log(newTree.levelOrder(newTree.root));
console.log(newTree.preorder(newTree.root));
console.log(newTree.inorder(newTree.root));
console.log(newTree.postorder(newTree.root));
























const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

console.log(prettyPrint(newTree.root));