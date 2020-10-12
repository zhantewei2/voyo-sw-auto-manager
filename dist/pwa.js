"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PWA = void 0;
const base_1 = require("./base");
const renderTp_1 = require("./renderTp");
const util_1 = require("./util");
const fs = require("fs");
const path = require("path");
const pwaTpPath = path.join(path.dirname(path.dirname(__filename)), "tp/pwa-tp.js");
const pwaPromptTpPath = path.join(path.dirname(path.dirname(__filename)), "tp/pwa-prompt-tp.js");
class PWA {
    constructor(opts) {
        this.opts = opts;
        this.config = new base_1.PWAConfigClass(opts.config || {});
    }
    injectCode(data) {
        if (!this.opts.enabled || this.config.customPrompt)
            return;
        data.html = data.html.replace(/<\/html>/, `
<script>
  ${renderTp_1.renderTp.render(fs.readFileSync(pwaTpPath).toString("utf8"), this.config)}
</script>
</html>
    `);
        data.html = util_1.genLinkForHTML(data.html, `<link rel="manifest" href="${this.config.manifestPath}"/>`);
    }
    assemblyManifestJson(assets) {
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
    assemblyPromptJs(assets) {
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
    exportPWAFile(assets) {
        if (!this.opts.enabled)
            return;
        this.assemblyManifestJson(assets);
        this.assemblyPromptJs(assets);
    }
}
exports.PWA = PWA;
//# sourceMappingURL=pwa.js.map