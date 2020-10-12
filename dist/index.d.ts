import { Compiler } from "webpack";
import { Opts, MainOpts } from "./base";
import { FileListHandler } from "./fileListHandler";
import { PWA } from "./pwa";
export declare class VoyoSwAutoManager {
    opts: Opts;
    fileListHandler: FileListHandler;
    pwa: PWA;
    apply(compiler: Compiler): void;
    constructor({ swOpts, pwaOpts }: MainOpts);
}
