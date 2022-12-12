import { data, example } from './data';

const processData = (data: string): [number[], number[]][] =>
    data
        .split('\n')
        .map(
            (row) =>
                row
                    .split(',')
                    .map((sections) =>
                        sections.split('-').map((str) => Number(str))
                    ) as [number[], number[]]
        );

// Iterate through each pair, and see if the lower bound of one section is less than or equal to the
// lower bound of the other, and if the upper bound is greater than or equal to the upper bound of the other
// If true, then increment count by 1.
// O(n) time, O(1) space
const findNumPairedRangesThatAreContained = (input: [number[], number[]][]) => {
    let count = 0;

    for (const [firstRange, secondRange] of input) {
        if (firstRange[0] <= secondRange[0] && firstRange[1] >= secondRange[1]) {
            count++;
            continue;
        } else if (secondRange[0] <= firstRange[0] && secondRange[1] >= firstRange[1]) {
            count++;
            continue;
        }
    }

    return count;
}

console.log(findNumPairedRangesThatAreContained(processData(data)));