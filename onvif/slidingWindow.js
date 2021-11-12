const { readSync, readFileSync } = require("fs");
function Minimum_Window(s, t) {
    let m = new Array(256);
    for (let i = 0; i < 256; i++) {
        m[i] = 0;
    }

    // Length of ans
    let ans = Number.MAX_VALUE;

    // Starting index of ans
    let start = 0;
    let count = 0;

    // Creating map
    for (let i = 0; i < t.length; i++) {
        if (m[t[i].charCodeAt(0)] == 0) count++;

        m[t[i].charCodeAt(0)]++;
    }
    console.log(m);

    // References of Window
    let i = 0;
    let j = 0;

    // Traversing the window
    while (j < s.length) {
        // Calculations
        m[s[j].charCodeAt(0)]--;

        if (m[s[j].charCodeAt(0)] == 0) count--;

        // Condition matching
        if (count == 0) {
            while (count == 0) {
                // Soring ans
                if (ans > j - i + 1) {
                    ans = Math.min(ans, j - i + 1);
                    start = i;
                }

                // Sliding I
                // Calculation for removing I
                m[s[i].charCodeAt(0)]++;

                if (m[s[i].charCodeAt(0)] > 0) count++;

                i++;
            }
        }
        j++;
    }
    if (ans != Number.MAX_VALUE)
        return s.join("").substring(start, start + ans);
    else return "-1";
}

// Driver code
let s = readFileSync("input.txt").toString();
let t = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

console.log("-->Smallest window that " + "contain all character : <br>");
console.time("t1");
console.log(Minimum_Window(s.split(""), t.split("")));
console.timeEnd("t1");
const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);