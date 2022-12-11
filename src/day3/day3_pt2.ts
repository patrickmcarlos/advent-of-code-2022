import { data, example } from './data';

const processData = (input: string): string[][] => {
    const res = [];
    let acc = [];
    const rows = input.split('\n');

    for (let i = 0; i < rows.length; i++) {
        if (i && i % 3 === 0) {
            res.push(acc);
            acc = [];
        }

        acc.push(rows[i]);
    }

    res.push(acc);

    return res;
 }


const charToPriorityNumber = (ch: string) => {
    if (ch !== ch.toLocaleUpperCase()) {
        return ch.charCodeAt(0) - 96;
    } else {
        return ch.charCodeAt(0) - 38;
    }
};

// With each group of strings, keep hashmap of char frequencies.
// Iterate through each string, and add each unique char to the freq map.
// If a freq value is 3 we've found the common character. Convert to priority value and add to sum.
// O(rows * chars) time, O(1) space
const findPrioritySums = (input: string[][]) => {
    let sum = 0;

    for (const group of input) {
        const map = new Map<string, number>();

        for (const str of group) {
            const set = new Set<string>();

            for (const ch of str) {
                if (set.has(ch)) {
                    continue;
                }

                map.set(ch, (map.get(ch) ?? 0) + 1)
                set.add(ch);

                if (map.get(ch) === 3) {
                    sum += charToPriorityNumber(ch);
                }
            }
        }
    }

    return sum;
};

console.log(findPrioritySums(processData(data)));
