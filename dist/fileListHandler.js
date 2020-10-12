"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileListHandler = void 0;
const base_1 = require("./base");
const renderTp_1 = require("./renderTp");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const swTpPath = path.join(path.dirname(path.dirname(__filename)), "tp", "sw-tp.js");
class FileListHandler {
    constructor(opts) {
        this.fileListPath = path.join(process.cwd(), base_1.fileListNameBase);
        this.opts = opts;
    }
    readOldFileList() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.fileListPath, "utf-8", (err, data) => {
                if (!data)
                    resolve(null);
                try {
                    resolve(JSON.parse(data));
                }
                catch (e) {
                    resolve(null);
                }
            });
        });
    }
    compareFileList(oldFileList, nowFileList) {
        let oldKey;
        let oldValue;
        let nowValue;
        const resultList = {};
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
            if (!oldExists)
                resultList[nowKey] = nowValue;
        }
        return resultList;
    }
    getFileListFromAssets(assets) {
        const fileList = {};
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
    exportCachePages(fileType, assets) {
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
    exportFileList(fileType) {
        return new Promise((resolve, reject) => {
            fs.writeFile(this.fileListPath, JSON.stringify(fileType, null, 2), "utf8", (err) => {
                if (err) {
                    console.error("write file list failure");
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    async init() {
        let currentVersion;
        if (this.opts.version === "auto") {
            const fileType = await this.readOldFileList();
            if (fileType && fileType.version) {
                try {
                    currentVersion = Number(fileType.version) + 1 + "";
                }
                catch (e) {
                    currentVersion = base_1.currentVersionDefault;
                }
            }
            else {
                currentVersion = base_1.currentVersionDefault;
            }
        }
        else {
            currentVersion = this.opts.version;
        }
        this.opts.version = currentVersion;
    }
    async exportCahePagesAndFileListFile(assets) {
        const nowFileList = this.getFileListFromAssets(assets);
        const resultFile = {
            version: this.opts.version,
            fileList: nowFileList,
        };
        this.exportCachePages(resultFile, assets);
        await this.exportFileList(resultFile);
    }
    exportSWFile(assets) {
        return new Promise((resolve, reject) => {
            fs.readFile(swTpPath, "utf-8", (err, data) => {
                if (err)
                    return reject(err);
                const content = renderTp_1.renderTp.render(data, this.opts, false);
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
exports.FileListHandler = FileListHandler;
//# sourceMappingURL=fileListHandler.js.map