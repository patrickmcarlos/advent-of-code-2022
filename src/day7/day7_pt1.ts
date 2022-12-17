/* ideas
- split input string by new lines
- number of tabs prefixing the string determines the depth.
    - this might only matter for folders
- after splitting by new line, go through each line
    - if we find a file, start iterating at its index and go backwards until
    we find a folder at exactly one depth higher and associate the file to that folder
*/

import { EXAMPLE_ONE } from './data';

// directories will have no size
// files will have no children
interface TreeChild {
    name: string;
    size: number;
    parent?: TreeChild; // we might 'cd ..'
    children: TreeChild[];
}

interface DirectorySize {
    name: string;
    totalSize: number;
}

const generateTree = (input: string) => {
    const split = input.split('\n');

    let root: TreeChild = {
        name: '/',
        size: 0,
        children: [],
    };

    let pointer: TreeChild = root;

    for (let i = 1; i < split.length; i++) {
        if (split[i] === '$ ls') {
            // go through next couple rows and add them to pointer children
            while (split[i + 1] && split[i + 1].charAt(0) !== '$') {
                i++;
                const [type, name] = split[i].split(' ');

                let objToAdd;

                if (type === 'dir') {
                    objToAdd = {
                        name,
                        size: 0,
                        parent: pointer,
                        children: [],
                    };
                } else {
                    objToAdd = {
                        name,
                        size: parseInt(type),
                        parent: pointer,
                        children: [],
                    };
                }

                pointer.children.push(objToAdd);
            }
        } else if (split[i].slice(0, 4) === '$ cd') {
            const target = split[i].split(' ').pop();

            if (target === '..' && pointer.parent) {
                pointer = pointer.parent;
            } else {
                for (const child of pointer.children) {
                    if (child.name === target) {
                        pointer = child;
                        break;
                    }
                }
            }
        }
    }

    return root;
};

const dfs = (node: TreeChild, threshold: number, dirsToDelete: DirectorySize[]) => {
    if (!node) {
        return 0;
    }

    if (node.size) {
        return node.size;
    }

    let totalSize = 0;

    for (const child of node.children) {
        totalSize += dfs(child, threshold, dirsToDelete);
    }

    if (totalSize <= threshold) {
        dirsToDelete.push({ name: node.name, totalSize });
    }

    return totalSize;
}

const findDirectoriesToDelete = (root: TreeChild, threshold: number) => {
    // dfs along the tree. at each node check if its total size meets threshold
    // lastly return the total size of all its children.
    const directoriesToDelete: DirectorySize[] = [];
    
    dfs(root, threshold, directoriesToDelete);

    let sum = 0;

    for (const dir of directoriesToDelete) {
        sum += dir.totalSize;
    }

    return sum;
}

console.log(findDirectoriesToDelete(generateTree(EXAMPLE_ONE), 100000));
