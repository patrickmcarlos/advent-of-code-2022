// https://adventofcode.com/2022/day/1
import { data } from './data';
import { MinPriorityQueue } from '@datastructures-js/priority-queue';

const processData = (input: string): number[][] => {
    const res: number[][] = [];

    const elves = input.split('\n\n');

    elves.forEach((elf) => res.push(elf.split('\n').map((str) => Number(str))));

    return res;
};

// Find the total number of calories held by the top 3 elves.
// Brute force: Find calories per elf, sort descending and take the first 3 elves and sum the values. O(nlogn) time, O(1) space.
// Optimized: Can avoid nlogn time from sorting by using a min heap with a size of 3. O(n) time, O(1) space.
const findTotalCaloriesBetweenTopNElves = (n: number, input: number[][]) => {
    const minHeap = new MinPriorityQueue<number>();

    const elfSums = input.map(elf => elf.reduce((a, b) => a + b));

    for (const calories of elfSums) {
        if (minHeap.size() < n) {
            minHeap.push(calories);
        } else if (minHeap.front() < calories) {
            minHeap.pop();
            minHeap.push(calories);
        }
    }

    const sum = minHeap.toArray().reduce((a, b) => a + b);

    return sum;
}

console.log(findTotalCaloriesBetweenTopNElves(3, processData(data)));