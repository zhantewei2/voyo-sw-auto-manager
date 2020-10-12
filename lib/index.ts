import { Compiler } from "webpack";
import { Opts, OptsIter, pluginId, MainOpts } from "./base";
import { renderTp } from "./renderTp";
import { FileListHandler } from "./fileListHandler";
import { PWA } from "./pwa";
const HtmlWebpackPlugin = require("html-webpack-plugin");

const fs = require("fs");
const path = require("path");
const hostPath = path.dirname(path.dirname(__filename));
const registryTp = fs
  .readFileSync(path.join(hostPath, "tp", "sw-registry-tp.js"))
  .toString("utf8");

export class VoyoSwAutoManager {
  opts: Opts;
  fileListHandler: FileListHandler;
  pwa: PWA;
  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap(pluginId, (compilation) => {
      const run = (data: any, cb: any) => {
        console.log("!!!!!!!!!!!!!!!!---run");
        data.html = data.html.replace(
          "</html>",
          `
<script type="text/javascript">
${renderTp.render(registryTp, this.opts)}
</script>
</html>`,
        );
        this.pwa.injectCode(data);
        cb && cb(null, data);
      };
      // htmlWebpackPlugin v3 for vue cli@4.5.7
      compilation.plugin("html-webpack-plugin-before-html-processing", run);
      // htmlWebpackPlugin  v4
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        pluginId,
        run,
      );
    });

    compiler.hooks.emit.tapAsync(pluginId, async (cp, next) => {
      try {
        await this.fileListHandler.init();
        await this.fileListHandler.exportSWFile(cp.assets);
        this.pwa.exportPWAFile(cp.assets);
        await this.fileListHandler.exportCahePagesAndFileListFile(cp.assets);
      } catch (e) {
        console.error(e);
      } finally {
        next();
      }
    });
  }
  constructor({ swOpts, pwaOpts }: MainOpts) {
    this.opts = new Opts(swOpts);
    this.fileListHandler = new FileListHandler(this.opts);
    this.pwa = new PWA(pwaOpts || {});
  }
}
