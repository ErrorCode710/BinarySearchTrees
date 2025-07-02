/*

GOAL FOR TODAYS 25MIN:

Write a buildTree(array) function that takes an array of data
(e.g., [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
and turns it into a balanced binary tree full of Node objects appropriately placed 
(don’t forget to sort and remove duplicates!).
The buildTree function should return the level-0 root node.

ALGO:




*/

class Node {
  constructor(data) {
    this.data = data;
    this.left;
    this.right;
  }
}

class Tree {
  constructor(rawArray) {
    const cleanArr = [...new Set(rawArray)].sort((a, b) => a - b);
    this.root = this.buildTree(cleanArr, 0, cleanArr.length);
  }

  buildTree(array, start, end) {
    console.log(array, start, end);
    // it must return the root o
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2); // middle or the rootest first stack // mid = 2
    console.log(mid);
    const data = array[mid]; // 4
    console.log(`Value Of Node ${data}`);

    const root = new Node(data);
    root.left = this.buildTree(array, start, mid - 1); // mid = 1
    root.right = this.buildTree(array, mid + 1, end); // first stack // start  = mid(3 + 1) 4  
    // console.log(root);

    return root;
  }
}
const arr = [1, 2, 4, 5, 3, 552];

const tree = new Tree(arr);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
prettyPrint(tree.root);
