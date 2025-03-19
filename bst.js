class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(array) {
        this.root = buildTree(array);
    }

    getSuccessor(current) {
        current = current.right;
        while (current !== null && current.left !== null) {
            current = current.left;
        }
        return current;
    }

    insert(value, node = this.root) {
        if (node === null) return new Node(value);

        if (value < node.data) {
            if (node.left === null) {
                node.left = new Node(value);
            } else {
                this.insert(value, node.left);
            }
        } else if (value > node.data) {
            if (node.right === null) {
                node.right = new Node(value);
            } else {
                this.insert(value, node.right);
            }
        }
        
        return node;
    }

    deleteItem(value, node = this.root) {
        if (node === null) return;

        if (value < node.data) {
            node.left = this.deleteItem(value, node.left);
        } else if (value > node.data) {
            node.right = this.deleteItem(value, node.right);
        } else {
            if (node.left === null) {
                return node.right;
            }
            if (node.right === null) {
                return node.left;
            }

            let successor = this.getSuccessor(node);
            node.data = successor.data;
            node.right = this.deleteItem(successor.data, node.right);
        }

        return node;
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