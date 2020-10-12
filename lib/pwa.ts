import { PWAConfig, PWAConfigClass, PWAOpts } from "./base";
import { renderTp } from "./renderTp";
import { genLinkForHTML } from "./util";
const fs = require("fs");
const path = require("path");
const pwaTpPath = path.join(
  path.dirname(path.dirname(__filename)),
  "tp/pwa-tp.js",
);
const pwaPromptTpPath = path.join(
  path.dirname(path.dirname(__filename)),
  "tp/pwa-prompt-tp.js",
);

export class PWA {
  opts: PWAOpts;
  config: PWAConfigClass;
  constructor(opts: PWAOpts) {
    this.opts = opts;
    this.config = new PWAConfigClass(opts.config || {});
  }
  injectCode(data: any) {
    if (!this.opts.enabled || this.config.customPrompt) return;
    data.html = data.html.replace(
      /<\/html>/,
      `
<script>
  ${renderTp.render(fs.readFileSync(pwaTpPath).toString("utf8"), this.config)}
</script>
</html>
    `,
    );
    data.html = genLinkForHTML(
      data.html,
      `<link rel="manifest" href="${this.config.manifestPath}"/>`,
    );
  }
  assemblyManifestJson(assets: any) {
    const content = JSON.stringify(this.opts.manifestConfig, null, 2);
    assets[this.config.manifestPath] = {
      source: function () {
        return content;
      },
      size: function () {
        return Buffer.from(content).byteLength;
      },
    };
  }
  assemblyPromptJs(assets: any) {
    const content = fs.readFileSync(pwaPromptTpPath).toString("utf8");
    assets[this.config.pwaPromptPath] = {
      source: function () {
        return content;
      },
      size: function () {
        return Buffer.from(content).byteLength;
      },
    };
  }
  exportPWAFile(assets: any) {
    if (!this.opts.enabled) return;
    this.assemblyManifestJson(assets);
    this.assemblyPromptJs(assets);
  }
}
