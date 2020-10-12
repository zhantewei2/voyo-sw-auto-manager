"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PWAConfigClass = exports.PWAConfig = exports.Opts = exports.pwaPromptPathDefault = exports.manifestPathDefault = exports.currentVersionDefault = exports.versionDefault = exports.cachePagesFilePathDefault = exports.cacheBrandDefault = exports.swFilePathDefault = exports.fileListNameBase = exports.pluginId = void 0;
exports.pluginId = "voyo-sw-auto-manager";
exports.fileListNameBase = ".voyo-sw-file";
exports.swFilePathDefault = "voyo-sw.js";
exports.cacheBrandDefault = "voyo-sw";
exports.cachePagesFilePathDefault = "voyo-sw-cachePages.json";
exports.versionDefault = "auto";
exports.currentVersionDefault = "1";
exports.manifestPathDefault = "voyo-manifest.json";
exports.pwaPromptPathDefault = "voyo-pwa-prompt.js";
class Opts {
    constructor({ updateInterval = undefined, useDebugger = false, pluginName = exports.pluginId, swFilePath = exports.swFilePathDefault, cachePagesFilePath = exports.cachePagesFilePathDefault, version = exports.versionDefault, cacheBrand = exports.cacheBrandDefault, scopeRule, dynamicCacheRules, }) {
        this.pluginName = pluginName;
        this.updateInterval = updateInterval;
        this.useDebugger = useDebugger;
        this.swFilePath = swFilePath;
        this.cachePagesFilePath = cachePagesFilePath;
        this.version = version;
        this.cacheBrand = cacheBrand;
        this.scopeRule = scopeRule;
        this.dynamicCacheRules = dynamicCacheRules;
    }
}
exports.Opts = Opts;
class PWAConfig {
}
exports.PWAConfig = PWAConfig;
class PWAConfigClass {
    constructor({ useDebugger = false, manifestPath = exports.manifestPathDefault, customPrompt = false, pwaPromptPath = exports.pwaPromptPathDefault, }) {
        this.useDebugger = useDebugger;
        this.manifestPath = manifestPath;
        this.customPrompt = customPrompt;
        this.pwaPromptPath = pwaPromptPath;
    }
}
exports.PWAConfigClass = PWAConfigClass;
//# sourceMappingURL=base.js.map