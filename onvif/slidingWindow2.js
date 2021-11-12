function getShortestUniqueSubstring(arr, str) {
    let i;
    let arrLen = arr.length;
    // to check how many chars from the given array are in the substring, respectively
    let countMap = {};
    for (i = 0; i < arrLen; i++) {
        countMap[arr[i]] = 0;
    }

    let h; // index of head
    let strLen = str.length;
    let head; // a char of the head index
    let headCount;
    let uniqueCounter = 0;

    let t = 0; // index of tail
    let tempLength;
    let result = null;
    let tail;
    let tailCount;

    for (h = 0; h < strLen; h++) {
        head = str.charAt(h);
        headCount = countMap[head];
        // if head is not a char in the given array, ignore it
        if (headCount === undefined) {
            continue;
        }
        if (headCount === 0) {
            uniqueCounter++;
        }
        countMap[head] = headCount + 1;

        // if the substring have all characters from the given array
        // move the tail to find the smallest substring
        while (uniqueCounter === arrLen) {
            tempLength = h - t + 1;
            // if (tempLength == arrLen) {
            //     // the minimum length, no need to continue
            //     return str.substring(t, h + 1);
            // }
            if (!result || tempLength < result.length) {
                result = str.substring(t, h + 1);
            }

            tail = str.charAt(t);
            tailCount = countMap[tail];
            // if tail is not a char in the given array, ignore it
            if (tailCount !== undefined) {
                tailCount--;
                if (tailCount === 0) {
                    uniqueCounter--;
                }
                countMap[tail] = tailCount;
            }
            t = t + 1;
        }
    }
    return result;
}

let result = `
  ['x', 'y', 'z'], 'xxyyzz' =>
  ${getShortestUniqueSubstring(["x", "y", "z"], "xxyyzz")}

  ['x', 'y', 'z'], 'xyyzyzyx' =>
  ${getShortestUniqueSubstring(["x", "y", "z"], "xyyzyzyx")}

  ['x', 'y', 'z'], 'xyz' =>
  ${getShortestUniqueSubstring(["x", "y", "z"], "xyz")}

  ['x', 'y', 'z'], 'xxyyxx' =>
  ${getShortestUniqueSubstring(["x", "y", "z"], "xxyyxx")}
`;

const testString = require("fs").readFileSync("input.txt").toString();

console.time("t1");
console.log(
    getShortestUniqueSubstring(
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
        testString
    )
);

const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
console.timeEnd("t1");
