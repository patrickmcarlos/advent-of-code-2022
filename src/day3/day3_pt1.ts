import { data, example } from './data';

const processData = (input: string): string[][] =>
    input.split('\n').map((str) => {
        const midIdx = Math.floor(str.length / 2);
        const compartmentOne = str.slice(0, midIdx);
        const compartmentTwo = str.slice(midIdx, str.length);

        return [compartmentOne, compartmentTwo];
    });

const charToPriorityNumber = (ch: string) => {
    if (ch !== ch.toLocaleUpperCase()) {
        return ch.charCodeAt(0) - 96;
    } else {
        return ch.charCodeAt(0) - 38;
    }
};

// Find common character between the halves and add it to the sum. O(rows * chars) time, O(1) space
const findPrioritySums = (input: string[][]) => {
    let sum = 0;

    for (const [firstHalf, secondHalf] of input) {
        const set = new Set<string>(firstHalf);
        for (let i = 0; i < secondHalf.length; i++) {
            const curr = secondHalf.charAt(i);

            if (set.has(curr)) {
                sum += charToPriorityNumber(curr);
                break;
            }
        }
    }

    return sum;
};

console.log(findPrioritySums(processData(data)));
