import { PWAConfigClass, PWAOpts } from "./base";
export declare class PWA {
    opts: PWAOpts;
    config: PWAConfigClass;
    constructor(opts: PWAOpts);
    injectCode(data: any): void;
    assemblyManifestJson(assets: any): void;
    assemblyPromptJs(assets: any): void;
    exportPWAFile(assets: any): void;
}
