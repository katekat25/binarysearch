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