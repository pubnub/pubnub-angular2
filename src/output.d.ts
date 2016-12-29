export declare class Output {
    constructor();
    push(channel: Object, message: Object): void;
    get(channel: Object): void;
    clean(channel: Object): void;
    subscribe(channel: Object): void;
    sort(channel: Object, key: string): void;
    unsubscribe(channel: Object): void;
}
