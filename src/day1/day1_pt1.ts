// https://adventofcode.com/2022/day/1
import { data } from './data';

const processData = (input: string): number[][] => {
    const res: number[][] = [];

    const elves = input.split('\n\n');

    elves.forEach((elf) => res.push(elf.split('\n').map((str) => Number(str))));

    return res;
};

// Each elf holds N items, and each item has M calories.
// Find the largest amount of calories held by any elf.
const findLargestCaloriesHeldByElf = (input: number[][]) => {
    let max = 0;

    input.forEach((elf) => {
        max = Math.max(max, elf.reduce((a, b) => a + b));
    });

    return max;
};

console.log(findLargestCaloriesHeldByElf(processData(data)));
