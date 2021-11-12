const mammoth = require("mammoth");

const s = mammoth.convertToHtml({ path: "./test.docx" }).then((result) => {
    console.log(result.value);
});
