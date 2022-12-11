// https://adventofcode.com/2022/day/2
import {
    data,
    DEFAULT_OPPONENT_RPS,
    BEATS_MAP,
    LOSE_MAP,
} from './data';

const processData = (data: string): string[][] =>
    data.split('\n').map((row) => row.split(' '));

// Create an array of corresponding RPS values for yourself (strategy guide) and opponent where indices 0 = R, 1 = P, 2 = S
// Convert each input row into the corresponding idx using the values.
// Use opponent idx and the result to determine what to add to total score. O(n) time, O(1) space.
const findTotalScore = (input: string[][]) => {
    const opponentRPS = DEFAULT_OPPONENT_RPS;
    let totalScore = 0;

    // 0 beats 2, 1 beats 0, 2 beats 1
    for (const [opponentPick, result] of input) {
        const opponentIdx = opponentRPS.findIndex(
            (val) => opponentPick === val
        );

        switch (result) {
            case 'X':
                totalScore += BEATS_MAP[opponentIdx] + 1;
                break;
            case 'Y':
                totalScore += 3 + opponentIdx + 1;
                break;
            case 'Z':
                totalScore += 6 + LOSE_MAP[opponentIdx] + 1;
                break;
        }
    }

    return totalScore;
};

console.log(findTotalScore(processData(data)));
