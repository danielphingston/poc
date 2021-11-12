const { readFileSync } = require("fs");
const regex =
    /(?=(A.*?B*?C.*?D.*?E.*?F.*?G.*?H.*?I.*?J.*?K.*?L.*?M.*?N.*?O.*?P.*?Q.*?R.*?S.*?T.*?U.*?V.*?W.*?X.*?Y.*?Z))/g;
console.time("t1");
const str = readFileSync("input.txt").toString();
let m;

let shortest = { length: Infinity };

while ((m = regex.exec(str)) !== null) {
    if (m.index === regex.lastIndex) {
        regex.lastIndex++;
    }

    m.forEach((match, groupIndex) => {
        if (match.length > 25 && match.length < shortest.length) {
            shortest = { length: match.length, match };
        }
        // console.log(`Found match, group ${groupIndex}: ${match}`);
    });
}
const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
console.timeEnd("t1");
console.log(shortest);
