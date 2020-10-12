declare class RenderTp<T extends {
    [key: string]: any;
}> {
    render(content: string, params: T, useBabel?: boolean): string;
}
export declare const renderTp: RenderTp<{
    [key: string]: any;
}>;
export {};
