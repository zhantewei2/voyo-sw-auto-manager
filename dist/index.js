"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoyoSwAutoManager = void 0;
const base_1 = require("./base");
const renderTp_1 = require("./renderTp");
const fileListHandler_1 = require("./fileListHandler");
const pwa_1 = require("./pwa");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");
const path = require("path");
const hostPath = path.dirname(path.dirname(__filename));
const registryTp = fs
    .readFileSync(path.join(hostPath, "tp", "sw-registry-tp.js"))
    .toString("utf8");
class VoyoSwAutoManager {
    constructor({ swOpts, pwaOpts }) {
        this.opts = new base_1.Opts(swOpts);
        this.fileListHandler = new fileListHandler_1.FileListHandler(this.opts);
        this.pwa = new pwa_1.PWA(pwaOpts || {});
    }
    apply(compiler) {
        compiler.hooks.compilation.tap(base_1.pluginId, (compilation) => {
            const run = (data, cb) => {
                console.log("!!!!!!!!!!!!!!!!---run");
                data.html = data.html.replace("</html>", `
<script type="text/javascript">
${renderTp_1.renderTp.render(registryTp, this.opts)}
</script>
</html>`);
                this.pwa.injectCode(data);
                cb && cb(null, data);
            };
            // htmlWebpackPlugin  v4
            // htmlWebpackPlugin v3 for vue cli4.5.7
            HtmlWebpackPlugin.getHooks ? HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(base_1.pluginId, run) : compilation.plugin("html-webpack-plugin-before-html-processing", run);
        });
        compiler.hooks.emit.tapAsync(base_1.pluginId, async (cp, next) => {
            try {
                await this.fileListHandler.init();
                await this.fileListHandler.exportSWFile(cp.assets);
                this.pwa.exportPWAFile(cp.assets);
                await this.fileListHandler.exportCahePagesAndFileListFile(cp.assets);
            }
            catch (e) {
                console.error(e);
            }
            finally {
                next();
            }
        });
    }
}
exports.VoyoSwAutoManager = VoyoSwAutoManager;
//# sourceMappingURL=index.js.map