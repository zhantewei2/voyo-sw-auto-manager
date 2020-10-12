import {
  FileType,
  Opts,
  FileList,
  fileListNameBase,
  FileListValue,
  currentVersionDefault,
} from "./base";
import { renderTp } from "./renderTp";
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const swTpPath = path.join(
  path.dirname(path.dirname(__filename)),
  "tp",
  "sw-tp.js",
);
export class FileListHandler {
  opts: Opts;
  constructor(opts: Opts) {
    this.opts = opts;
  }
  fileListPath: string = path.join(process.cwd(), fileListNameBase);

  readOldFileList(): Promise<null | FileType> {
    return new Promise((resolve, reject) => {
      fs.readFile(
        this.fileListPath,
        "utf-8",
        (err: any | null, data: string) => {
          if (!data) resolve(null);
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            resolve(null);
          }
        },
      );
    });
  }
  compareFileList(oldFileList: FileList, nowFileList: FileList): FileList {
    let oldKey: string;
    let oldValue: FileListValue;
    let nowValue: FileListValue;
    const resultList: FileList = {};
    for (const nowKey in nowFileList) {
      let oldExists = false;
      nowValue = nowFileList[nowKey];
      const oldKeys = Object.keys(oldFileList);
      for (let i = 0, len = oldKeys.length; i < len; i++) {
        oldKey = oldKeys[i];
        if (oldKey === nowKey) {
          oldValue = oldFileList[oldKey];
          if (!oldValue || oldValue.md5 !== nowValue.md5) {
            resultList[nowKey] = nowValue;
          }
          oldExists = true;
          break;
        }
      }
      if (!oldExists) resultList[nowKey] = nowValue;
    }
    return resultList;
  }
  getFileListFromAssets(assets: any): FileList {
    const fileList: FileList = {};
    for (const key in assets) {
      fileList[key] = {
        md5: crypto
          .createHash("md5")
          .update(assets[key].source())
          .digest("hex"),
      };
    }
    return fileList;
  }
  exportCachePages(fileType: FileType, assets: any) {
    const content = JSON.stringify(fileType);
    assets[this.opts.cachePagesFilePath] = {
      source: function () {
        return content;
      },
      size: function () {
        return Buffer.from(content).byteLength;
      },
    };
  }
  exportFileList(fileType: FileType): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(
        this.fileListPath,
        JSON.stringify(fileType, null, 2),
        "utf8",
        (err: any) => {
          if (err) {
            console.error("write file list failure");
            reject(err);
          } else {
            resolve();
          }
        },
      );
    });
  }
  async init() {
    let currentVersion: string;
    if (this.opts.version === "auto") {
      const fileType = await this.readOldFileList();
      if (fileType && fileType.version) {
        try {
          currentVersion = Number(fileType.version) + 1 + "";
        } catch (e) {
          currentVersion = currentVersionDefault;
        }
      } else {
        currentVersion = currentVersionDefault;
      }
    } else {
      currentVersion = this.opts.version;
    }
    this.opts.version = currentVersion;
  }

  async exportCahePagesAndFileListFile(assets: any) {
    const nowFileList: FileList = this.getFileListFromAssets(assets);
    const resultFile: FileType = {
      version: this.opts.version,
      fileList: nowFileList,
    };
    this.exportCachePages(resultFile, assets);
    await this.exportFileList(resultFile);
  }

  exportSWFile(assets: any): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.readFile(swTpPath, "utf-8", (err: any, data: string) => {
        if (err) return reject(err);
        const content = renderTp.render(data, this.opts, false);
        assets[this.opts.swFilePath] = {
          source: function () {
            return content;
          },
          size: function () {
            return Buffer.from(content).byteLength;
          },
        };
        resolve();
      });
    });
  }
}
