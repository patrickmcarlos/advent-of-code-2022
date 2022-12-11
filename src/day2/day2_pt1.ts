// https://adventofcode.com/2022/day/2
import { data, DEFAULT_STRATEGY_GUIDE, DEFAULT_OPPONENT_RPS, BEATS_MAP } from './data';

const processData = (data: string): string[][] =>
    data.split('\n').map((row) => row.split(' '));

// Create an array of corresponding RPS values for yourself (strategy guide) and opponent where indices 0 = R, 1 = P, 2 = S 
// Convert each input row into the corresponding idx using the values.
// Compare indices to see who won each round and add to total score. O(n) time, O(1) space.
const findTotalScore = (input: string[][]) => {
    const strategyGuide = DEFAULT_STRATEGY_GUIDE;
    const opponentRPS = DEFAULT_OPPONENT_RPS;
    let totalScore = 0;

    // 0 beats 2, 1 beats 0, 2 beats 1
    for (const [opponentPick, myPick] of input) {
        const opponentIdx = opponentRPS.findIndex((val) => opponentPick === val);
        const myIdx = strategyGuide.findIndex((val) => myPick === val);

        totalScore += myIdx + 1;

        if (myIdx === opponentIdx) {
            totalScore += 3;
        } else if (BEATS_MAP[myIdx] === opponentIdx) {
            totalScore += 6;
        }
    }

    return totalScore;
}

console.log(findTotalScore(processData(data)));
