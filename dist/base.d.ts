export declare const pluginId = "voyo-sw-auto-manager";
export declare const fileListNameBase = ".voyo-sw-file";
export declare const swFilePathDefault = "voyo-sw.js";
export declare const cacheBrandDefault = "voyo-sw";
export declare const cachePagesFilePathDefault = "voyo-sw-cachePages.json";
export declare const versionDefault = "auto";
export declare const currentVersionDefault = "1";
export declare const manifestPathDefault = "voyo-manifest.json";
export declare const pwaPromptPathDefault = "voyo-pwa-prompt.js";
export interface OptsIter {
    version?: string | "auto";
    updateInterval?: number;
    useDebugger?: boolean;
    pluginName?: string;
    swFilePath?: string;
    cachePagesFilePath?: string;
    cacheBrand?: string;
    scopeRule?: RegExp;
    dynamicCacheRules?: Array<RegExp | string> | string | RegExp;
}
export declare class Opts implements OptsIter {
    updateInterval?: number;
    useDebugger?: boolean;
    pluginName: string;
    swFilePath: string;
    cachePagesFilePath: string;
    version: string;
    cacheBrand: string;
    scopeRule?: RegExp;
    dynamicCacheRules?: Array<RegExp | string> | string | RegExp;
    constructor({ updateInterval, useDebugger, pluginName, swFilePath, cachePagesFilePath, version, cacheBrand, scopeRule, dynamicCacheRules, }: OptsIter);
}
export declare type FileListValue = {
    md5: string;
};
export declare type FileList = Record<string, FileListValue>;
export interface FileType {
    version: string;
    fileList: FileList;
}
export interface PWAManifestConfig {
    background_color: string;
    categories: string;
    description: string;
    dir: string;
    display: "fullscreen" | "standalone" | "minimal-ui" | "browser";
    iarc_rating_id: any;
    icons: Array<{
        src: string;
        sizes: string;
        type: string;
    }>;
    lang: string;
    orientation: string;
    prefer_related_applications: any;
    related_applications: any;
    scope: string;
    screenshots: Array<{
        src: string;
        sizes: string;
        type: string;
    }>;
    serviceworker: any;
    short_name: string;
    shortcuts: any;
    start_url: string;
    theme_color: string;
}
export declare class PWAConfig {
    useDebugger?: boolean;
    manifestPath?: string;
    customPrompt?: boolean;
    pwaPromptPath?: string;
}
export declare class PWAConfigClass {
    useDebugger: boolean;
    manifestPath: string;
    customPrompt: boolean;
    pwaPromptPath: string;
    constructor({ useDebugger, manifestPath, customPrompt, pwaPromptPath, }: PWAConfig);
}
export interface PWAOpts {
    enabled: boolean;
    manifestConfig: PWAManifestConfig;
    config: PWAConfig;
}
export interface MainOpts {
    swOpts: OptsIter;
    pwaOpts: PWAOpts;
}
