export const pluginId = "voyo-sw-auto-manager";
export const fileListNameBase = ".voyo-sw-file";
export const swFilePathDefault = "voyo-sw.js";
export const cacheBrandDefault = "voyo-sw";
export const cachePagesFilePathDefault = "voyo-sw-cachePages.json";
export const versionDefault = "auto";
export const currentVersionDefault = "1";
export const manifestPathDefault = "voyo-manifest.json";
export const pwaPromptPathDefault = "voyo-pwa-prompt.js";

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

export class Opts implements OptsIter {
  updateInterval?: number;
  useDebugger?: boolean;
  pluginName: string;
  swFilePath: string;
  cachePagesFilePath: string;
  version: string;
  cacheBrand: string;
  scopeRule?: RegExp;
  dynamicCacheRules?: Array<RegExp | string> | string | RegExp;
  constructor({
    updateInterval = undefined,
    useDebugger = false,
    pluginName = pluginId,
    swFilePath = swFilePathDefault,
    cachePagesFilePath = cachePagesFilePathDefault,
    version = versionDefault,
    cacheBrand = cacheBrandDefault,
    scopeRule,
    dynamicCacheRules,
  }: OptsIter) {
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
export type FileListValue = {
  md5: string;
};
export type FileList = Record<string, FileListValue>;
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
  icons: Array<{ src: string; sizes: string; type: string }>;
  lang: string;
  orientation: string;
  prefer_related_applications: any;
  related_applications: any;
  scope: string;
  screenshots: Array<{ src: string; sizes: string; type: string }>;
  serviceworker: any;
  short_name: string;
  shortcuts: any;
  start_url: string;
  theme_color: string;
}
export class PWAConfig {
  useDebugger?: boolean;
  manifestPath?: string;
  customPrompt?: boolean;
  pwaPromptPath?: string;
}
export class PWAConfigClass {
  useDebugger: boolean;
  manifestPath: string;
  customPrompt: boolean;
  pwaPromptPath: string;
  constructor({
    useDebugger = false,
    manifestPath = manifestPathDefault,
    customPrompt = false,
    pwaPromptPath = pwaPromptPathDefault,
  }: PWAConfig) {
    this.useDebugger = useDebugger;
    this.manifestPath = manifestPath;
    this.customPrompt = customPrompt;
    this.pwaPromptPath = pwaPromptPath;
  }
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
