export declare class Autoload {
    constructor();
    initialize(instance: Object): void;
    enableLoad(args: Object): void;
    getHistory(channel: Object, callback: () => void): void;
    disableLoad(args: Object): void;
}
