"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderTp = void 0;
const babel = require("@babel/core");
class RenderTp {
    render(content, params, useBabel = true) {
        let evalContent = "";
        for (const key in params) {
            let value = params[key];
            if (Array.isArray(value)) {
                value = value
                    .map((i) => {
                    if (typeof i === "string") {
                        return JSON.stringify(i);
                    }
                    else {
                        return i;
                    }
                })
                    .join(",");
                value = `'[${value}]'`;
            }
            else if (typeof value === "string") {
                value = `"${value}"`;
            }
            evalContent += `var ${key}=${value};\n`;
        }
        content = content.replace(/%{((.|\r\n|\n|\r)*?)}%/g, (str, ...args) => {
            // return "1";
            return eval(evalContent + args[0]);
        });
        if (useBabel)
            content = babel
                .transformSync(content, {
                filename: __filename,
                presets: [["@babel/preset-env", { useBuiltIns: false }]],
            })
                .code.replace(/require\(.*?\);?/g, "")
                .replace(/\n\n+/g, "\n")
                .replace(/(^\n|\n$)/g, "");
        return content;
    }
}
exports.renderTp = new RenderTp();
//# sourceMappingURL=renderTp.js.map