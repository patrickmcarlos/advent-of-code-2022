import { data } from './data';

// Sliding window
// for every substring, put it into a set
// on the first set that has a size of 4, we take the 2nd pointer idx as the result
const findNumCharactersToFirstMarker = (input: string, windowSize: number) => {
    let [left, right] = [0, windowSize];
    let ans = 0;

    while (right < input.length) {
        const set = new Set<string>(input.slice(left, right));

        if (set.size === windowSize) {
            ans = right;
            break;
        }

        left++;
        right++;
    }

    return ans;
};

console.log(findNumCharactersToFirstMarker(data, 14));
