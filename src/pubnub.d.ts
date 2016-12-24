export declare class PubNubAngular {
    constructor();
    init(initConfig: Object);
    getInstance(instanceName: string): Object;
    subscribe(args: Object): void;
    unsubscribe(args: Object): void;
    getMessage(channel: Object, callback: (message: Object) => void): Object[];
    getPresence(channel: Object, callback: (presence: Object) => void): void;
    getStatus(channel: Object, callback: (status: Object) => void): void;
    getError(channel: Object, callback: (error: Object) => void): void;
    clean(channel: Object): void;
}