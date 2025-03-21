class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.root = buildTree(array);
    }

    getSuccessor(node) {
        if (node.right === null) return null;
        let current = node.right;
        while (current.left !== null) {
            current = current.left;
        }
        return current;
    }

    insert(value, node = this.root) {
        if (node === null) return new Node(value);

        if (value < node.data) {
            node.left = this.insert(value, node.left);
        } else if (value > node.data) {
            node.right = this.insert(value, node.right);
        }

        return node;
    }

    deleteItem(value, node = this.root) {
        if (node === null) return null;

        if (value < node.data) {
            node.left = this.deleteItem(value, node.left);
        } else if (value > node.data) {
            node.right = this.deleteItem(value, node.right);
        } else {
            if (node.left === null) return node.right;
            if (node.right === null) return node.left;

            let successor = this.getSuccessor(node);
            node.data = successor.data;
            node.right = this.deleteItem(successor.data, node.right);
        }

        return node;
    }

    find(value, node = this.root) {
        if (node === null) return null;

        if (value < node.data) {
            return this.find(value, node.left);
        } else if (value > node.data) {
            return this.find(value, node.right);
        } else return node;
    }

    levelOrder(callback) {
        if (callback === undefined) {
            throw new Error("Must provide a callback function.");
        }
        if (this.root === null) return;
        let queue = [this.root];

        while (queue.length > 0) {
            let current = queue.shift();
            callback(current);
            if (current.left !== null) queue.push(current.left);
            if (current.right !== null) queue.push(current.right);
        }
    }

    traverse(type, callback, node = this.root) {
        if (typeof callback !== "function") {
            throw new Error("Must provide a callback function.");
        }
        if (node === null) return;

        if (type === "pre") callback(node);
        this.traverse(type, callback, node.left);
        if (type === "in") callback(node);
        this.traverse(type, callback, node.right);
        if (type === "post") callback(node);
    }

    inOrder(callback) {
        this.traverse("in", callback);
    }

    preOrder(callback) {
        this.traverse("pre", callback);
    }

    postOrder(callback) {
        this.traverse("post", callback);
    }

    height(node) {
        if (node === null) return -1;

        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(targetNode, currentNode = this.root, x = 0) {
        if (currentNode === null) return -1;
        if (targetNode.data === currentNode.data) return x;
    
        let left = this.depth(targetNode, currentNode.left, x + 1);
        if (left !== -1) return left;
    
        let right = this.depth(targetNode, currentNode.right, x + 1);
        if (right !== -1) return right;
    
        return -1;
    }

    isBalanced() {
        if (this.root === null) return true;
    
        let leftHeight = this.height(this.root.left);
        let rightHeight = this.height(this.root.right);
    
        return Math.abs(leftHeight - rightHeight) <= 1;
    }
}

function sort(array) {
    return [...new Set(array)].sort((a, b) => a - b);
}

function buildTree(array) {
    let sortedArray = sort(array);

    function sortedToTree(array, start, end) {
        if (start > end) return null;

        let middle = start + Math.floor((end - start) / 2);

        let root = new Node(array[middle]);

        root.left = sortedToTree(array, start, middle - 1);
        root.right = sortedToTree(array, middle + 1, end);

        return root;
    }

    return sortedToTree(sortedArray, 0, sortedArray.length - 1);
}

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



let testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let tree = new Tree(testArray);
prettyPrint(tree.root);
tree.insert(0);
tree.insert(25);
tree.insert(100);
tree.insert(68);
tree.deleteItem(8);
console.log("After mods:");
prettyPrint(tree.root);
console.log(tree.find(2));
tree.levelOrder(node => console.log(node.data));
console.log(tree.isBalanced());