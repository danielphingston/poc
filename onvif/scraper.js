const request = require("request");

const ReadLine = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});
async function Main() {
    ReadLine.question("inseCamUrl: ", (inseCamUrl) => {
        var Checkinginterval = 10 * 200;
        for (const pages in range(700)) {
            setTimeout(
                function (pages) {
                    request(
                        `${inseCamUrl}/?page=${pages}`,
                        function (err, res, body) {
                            if (body.indexOf("The page was not found") == -1) {
                                var regips = body.matchAll(
                                    /http:..\d+.\d+.\d+.\d+.:\d+/g
                                );
                                var ips = Array.from(regips);
                                try {
                                    for (const pages2 in range(700)) {
                                        console.log(ips[pages2][0]);
                                    }
                                } catch {}
                            } else {
                                console.error("Invalid country code!");
                                process.exit(1);
                            }
                        }
                    );
                },
                Checkinginterval * parseInt(pages),
                pages
            );
        }
    });
}

function range(start, stop, step) {
    if (typeof stop == "undefined") {
        // one param defined
        stop = start;
        start = 0;
    }

    if (typeof step == "undefined") {
        step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }

    return result;
}

Main();
