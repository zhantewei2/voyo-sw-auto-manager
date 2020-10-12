export const genLinkForHTML = (html: string, linkContent: string): string => {
  let matchHead = false;
  html = html.replace(
    /<head([^>/]*?)>((.|\r\n|\n)*?)<\/head>/,
    (text: string, ...args: any[]) => {
      matchHead = true;
      return `
<head${args[0] || ""}>
${args[1]}
  ${linkContent}
</head>
      `;
    },
  );
  if (!matchHead) {
    html = linkContent.replace(
      /<html([^>/]*?)>/,
      (text: string, ...args: any[]) => {
        return `<html${args[0] || ""}>
  ${linkContent}
      `;
      },
    );
  }
  return html;
};
