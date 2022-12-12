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

const hasOverlap = (firstRange: number[], secondRange: number[]) => {
    const firstOverlapsSecond = (firstRange[1] >= secondRange[0] && firstRange[1] <= secondRange[1]) || firstRange[0] <= secondRange[0] && firstRange[1] >= secondRange[1];
    const secondOverlapsFirst = (secondRange[1] >= firstRange[0] && secondRange[1] <= firstRange[1]) || secondRange[0] <= firstRange[0] && secondRange[1] >= firstRange[1];

    return firstOverlapsSecond || secondOverlapsFirst;
}

// Similar to part one, except take into account partial overlaps as well.
// O(n) time, O(1) spaces
const findNumPairedRangesThatAreContained = (input: [number[], number[]][]) => {
    let count = 0;

    for (const [firstRange, secondRange] of input) {
        if (hasOverlap(firstRange, secondRange)) {
            count++;
        }
    }

    return count;
}

console.log(findNumPairedRangesThatAreContained(processData(data)));