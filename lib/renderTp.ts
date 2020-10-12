const babel = require("@babel/core");

class RenderTp<T extends { [key: string]: any }> {
  render(content: string, params: T, useBabel = true): string {
    let evalContent = "";
    for (const key in params) {
      let value: any = params[key];
      if (Array.isArray(value)) {
        value = value
          .map((i: any) => {
            if (typeof i === "string") {
              return JSON.stringify(i);
            } else {
              return i;
            }
          })
          .join(",");
        value = `'[${value}]'`;
      } else if (typeof value === "string") {
        value = `"${value}"`;
      }
      evalContent += `var ${key}=${value};\n`;
    }
    content = content.replace(
      /%{((.|\r\n|\n|\r)*?)}%/g,
      (str: string, ...args: any[]) => {
        // return "1";
        return eval(evalContent + args[0]);
      },
    );
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

export const renderTp = new RenderTp();
