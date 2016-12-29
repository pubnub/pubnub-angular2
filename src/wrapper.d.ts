export declare class Wrapper {
    constructor();
    init(initConfig): void;
    getLabel(): string;
    subscribe(args: Object): void;
    unsubscribe(args: Object): void;
    getMessage(channel: Object, callback: (message: Object) => void): void;
    getPresence(channel: Object, callback: (presence: Object) => void): void;
    getStatus(channel: Object, callback: (status: Object) => void): void;
    getError(callback: (error: Object) => void): void;
    clean(channel: Object): void;
    getOriginalInstance(): void;
    wrapAttribute(attributeName: string): void;
    wrapMethod(methodName: string): void;
}
