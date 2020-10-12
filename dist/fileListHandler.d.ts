import { FileType, Opts, FileList } from "./base";
export declare class FileListHandler {
    opts: Opts;
    constructor(opts: Opts);
    fileListPath: string;
    readOldFileList(): Promise<null | FileType>;
    compareFileList(oldFileList: FileList, nowFileList: FileList): FileList;
    getFileListFromAssets(assets: any): FileList;
    exportCachePages(fileType: FileType, assets: any): void;
    exportFileList(fileType: FileType): Promise<void>;
    init(): Promise<void>;
    exportCahePagesAndFileListFile(assets: any): Promise<void>;
    exportSWFile(assets: any): Promise<void>;
}
