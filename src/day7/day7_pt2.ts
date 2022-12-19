/* ideas
- split input string by new lines
- number of tabs prefixing the string determines the depth.
    - this might only matter for folders
- after splitting by new line, go through each line
    - if we find a file, start iterating at its index and go backwards until
    we find a folder at exactly one depth higher and associate the file to that folder
*/

import { data, EXAMPLE_ONE } from './data';

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

const dfs = (node: TreeChild, dirsToDelete: DirectorySize[]) => {
    if (!node) {
        return 0;
    }

    if (node.size) {
        return node.size;
    }

    let totalSize = 0;

    for (const child of node.children) {
        totalSize += dfs(child, dirsToDelete);
    }

    dirsToDelete.push({ name: node.name, totalSize });

    return totalSize;
};

const findDirectoriesToDelete = (root: TreeChild) => {
    // dfs along the tree. at each node check if its total size meets threshold
    // lastly return the total size of all its children.
    const directoriesToDelete: DirectorySize[] = [];

    dfs(root, directoriesToDelete);

    const totalSize =
        directoriesToDelete[directoriesToDelete.length - 1].totalSize;
    const sizeUnusedSpace = 70000000 - totalSize;
    const minDirSize = 30000000 - sizeUnusedSpace;

    console.log({ totalSize, sizeUnusedSpace, minDirSize });

    directoriesToDelete.sort((a, b) => b.totalSize - a.totalSize);

    const filtered = directoriesToDelete.filter(
        (obj) => obj.totalSize >= minDirSize - 1000000
    );

    console.log({ filtered })

    return filtered.pop().name;
};

console.log(findDirectoriesToDelete(generateTree(data)));
