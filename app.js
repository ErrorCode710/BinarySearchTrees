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
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(rawArray) {
    const cleanArr = [...new Set(rawArray)].sort((a, b) => a - b);
    this.root = this.buildTree(cleanArr, 0, cleanArr.length - 1);
  }

  buildTree(array, start, end) {
    // console.log(array, start, end);
    // it must return the root o
    if (start > end) return null;
    const mid = Math.floor((start + end) / 2); // middle or the rootest first stack // mid = 2
    // console.log(mid);
    const data = array[mid]; // 4
    // console.log(`Value Of Node ${data}`);

    const root = new Node(data);
    root.left = this.buildTree(array, start, mid - 1); // mid = 1
    root.right = this.buildTree(array, mid + 1, end); // first stack // start  = mid(3 + 1) 4
    // console.log(root);

    return root;
  }
  insert(data) {
    const node = new Node(data);
    if (this.root === null) {
      this.root = node;
    } else {
      this.insertHelper(data, this.root);
    }
  }
  delete(data) {
    this.deleteHelper(data, this.root);
  }
  levelOrder(callback) {
    this.levelOrderHelper(callback, this.root);
  }
  insertHelper(data, root) {
    /* PROBLEM TO SOLVE HOW TO TRANVERSE ON RECURSION AND HOW TO FIND THE BASE

      SECOND SOLUTION:
     ALGO BASE 2:
      1. COMPARE ROOT AND INSERTED NUMBER
      2. GO TO BRANCH(LEFT,RIGHT)
      3. CHECK THE BRANCH IF ITS NOT NULL
      4. IF ITS NULL THEN ITS YOUR PLACE // IT SHOULD BE STOP HERE
      5. IF NOT REPEAT GO TO THE BRANCH // This is where the traverse wou
      6. REPEAT STEP 1
      

     */
    /*    if (this.root.left === null) return;  // Based on my analysis this base is error
     if (this.root.right === null) return;
    const node = new Node(data);
    if (data < this.root.data) {
      this.root.left = node; // The problem of this it would be overwrite the existed node
      return;
    }
    if (data > this.root.data) {
      this.root.right = node;
      return;
    }*/

    const node = new Node(data);
    if (data === root.data) return;
    if (data > root.data) {
      if (root.right === null) {
        root.right = node;

        return; // stoping point
      } else {
        this.insertHelper(data, root.right);
      }
    } else {
      if (root.left === null) {
        root.left = node;

        return;
      } else {
        this.insertHelper(data, root.left);
      }
    }
  }
  deleteHelper(data, node) {
    /*Case 1. Delete a Leaf Node in BST
    GOAL FIND THAT LEAF NODE AND JUST DELETE IT 

    1. COMPARE DELETE NODE TO CURRENT NODE
    2. CHECK IF MATCH
    3. IF MATCH CHECK THE LEFT AND RIGHT IF NULL // BASE CASE 
    4. REMOVE NODE
    5. IF NOT MATCH GO TO THE NEXT NODE */ // RECURSION

    if (node === null) {
      return null;
    }
    if (node.data === data) {
      //for case 1
      if (node.right === null && node.left === null) {
        return null;
      }
      //for case 2
      if (node.left === null && node.right !== null) {
        return node.right;
      }
      if (node.right === null && node.left !== null) {
        return node.left;
      }
      // for case 3
      /*CASE 3: DELETE NODE WITH TWO CHILD
      GOAL IS TO FIND THE NEXT DELETE VALUE CLOSELY VALUE (e.g delete 4 replace with 3 )
      
     
      1. COMPARE  THE VALUE TO BE DELETED
      WITH CURRENT NODE DATA

      2. IF IT MATCHES AND IT HAS TWO CHILD
      3. FIND THE CLOSELY BIGGER VALUE
      4. TO FIND GO TO THE EQUAL VALUE GO TO RIGHT AND GO TO THE LEFTMOST IF THE LEFT IS NULL THEN THATS THE VALUE 

      5. THE FIND VALUE SHOULD BE REMOVE AND IF IT HAS A CHILD POINT TO THE PARENTS
      6. THE VALUE TO BE DELETED MUST SWAP OR REPLACE WITH THE FIND VALUE NODE.DATA 
      
      
       PROBLEM: THE SMALLEST NODE.DATA CANT PASS THROUGH TO ITS PARENT BECAUSE IT WILL JUST RETURN NODE OR ITS PARENT

       WHAT IF ITS PARENTS IS THE ONE WHO DELETE IT 
      */
      let minNode = this.findMin(node.right);
      node.data = minNode.data;
      node.right = this.deleteHelper(minNode.data, node.right);
    }

    if (data > node.data) {
      node.right = this.deleteHelper(data, node.right);
    } else {
      node.left = this.deleteHelper(data, node.left);
    }

    return node;
  }
  levelOrderHelper(callback, node) {
    /*
    STEP BY STEP IN MY FUCKING OWN WORDS
1. QUEUE THE FIRST NODE 
2. DEQUEU AND VISIT THE NODE CHECK FOR THE CHILD NODE ADD THE CHILD NODE TO THE QUEUE
    
    
    
    */
    console.log("✅Start");
    let current = node;
    const queue = [current];

    // [8,4,67]
    while (queue.length > 0) {
      let queueLog = queue.map((item) => item.data);
      console.log("Log For Queue", queueLog);

      callback(current);

      queue.shift();
      if (current.left !== null) {
        queue.push(current.left);
      }
      if (current.right !== null) {
        queue.push(current.right);
      }

      current = queue[0];
    }
  }
  search(data) {
    const node = this.searchHelper(data, this.root);
    return node;
  }
  findMin(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }
  searchHelper(data, node) {
    if (node === null) {
      console.log("Doesn't Exist");
      return null;
    }

    if (data === node.data) {
      console.log(node.data);
      return node;
    }

    if (data > node.data) {
      return this.searchHelper(data, node.right);
    } else {
      return this.searchHelper(data, node.left);
    }
  }
}
const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

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
// tree.insert(7);

// console.log(tree);
// prettyPrint(tree.root);
// tree.delete(4);
// tree.search(69);
// prettyPrint(tree.root);
tree.levelOrder(addOneNodata);

function addOneNodata(node) {
  const result = node.data + 1;
  console.log(result);
  return result;
}
