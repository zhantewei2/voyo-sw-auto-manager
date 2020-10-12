"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genLinkForHTML = void 0;
exports.genLinkForHTML = (html, linkContent) => {
    let matchHead = false;
    html = html.replace(/<head([^>/]*?)>((.|\r\n|\n)*?)<\/head>/, (text, ...args) => {
        matchHead = true;
        return `
<head${args[0] || ""}>
${args[1]}
  ${linkContent}
</head>
      `;
    });
    if (!matchHead) {
        html = linkContent.replace(/<html([^>/]*?)>/, (text, ...args) => {
            return `<html${args[0] || ""}>
  ${linkContent}
      `;
        });
    }
    return html;
};
//# sourceMappingURL=util.js.map