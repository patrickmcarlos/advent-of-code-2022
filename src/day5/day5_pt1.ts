import { INSTRUCTIONS, INITIAL_STACKS, EXAMPLE_INITIAL_STACKS, EXAMPLE_INSTRUCTIONS } from './data';

const isValidCharacter = (str: string) => {
    const charCode = str.charCodeAt(0);

    return charCode > 64 && charCode < 91;
};

const initializeStacks = (input: string): string[][] => {
    const rows = input.split('\n');
    const stackIdxRow = rows.pop();
    const stacks = [];

    let numStacks: number = 0;

    // Find number of stacks by going to the last row and finding the first number starting at the end of the string
    for (let i = stackIdxRow.length - 1; i >= 0; i--) {
        if (!isNaN(parseInt(stackIdxRow.charAt(i)))) {
            numStacks = parseInt(stackIdxRow.charAt(i));
            break;
        }
    }

    // Starting from index 1, take the number and add to appropriate stack. Next number is 4 spots ahead.
    for (let i = rows.length - 1; i >= 0; i--) {
        for (let j = 1; j < numStacks * 4; j += 4) {
            const stackIdx = (j - 1) / 4;

            if (!stacks[stackIdx]) {
                stacks.push([]);
            }

            isValidCharacter(rows[i].charAt(j)) &&
                stacks[stackIdx].push(rows[i].charAt(j));
        }
    }

    return stacks;
};

// For each instruction string, just take out the words resulting in a triplet array. Idx 0 = amount to remove, 1 = stack to take from, 2 = stack to add to
const processInstructions = (input: string): [number, number, number][] => {
    const instructions = input
        .split('\n')
        .map((str) => str.split(' '))
        .map((words) =>
            words
                .filter((word) => !isNaN(parseInt(word)))
                .map((str) => parseInt(str))
        );

    return instructions as [number, number, number][];
};

// Go through each instruction, splice the amount from the end of the "from" stack, reverse it, then add to the "to" stack
// O(n) time (n being number of instructions), O(m) space (m being number of stacks)
const findTopOfStacksAfterInstructions = (
    stacks: string[][],
    instructions: [number, number, number][]
): string => {
    for (const [amount, from, to] of instructions) {
        const removed = stacks[from - 1]
            .splice(stacks[from - 1].length - amount, amount)
            .reverse();
        stacks[to - 1].push(...removed);
    }

    const topOfStacks = stacks.map((stack) => stack[stack.length - 1]);

    return topOfStacks.join('');
};

console.log(
    findTopOfStacksAfterInstructions(
        initializeStacks(EXAMPLE_INITIAL_STACKS),
        processInstructions(EXAMPLE_INSTRUCTIONS)
    )
);

console.log(
    findTopOfStacksAfterInstructions(
        initializeStacks(INITIAL_STACKS),
        processInstructions(INSTRUCTIONS)
    )
);
