export declare class Broadcast {
    constructor();
    emit(event: string, channel: Object, args: Object): void;
    error(args: Object): void;
    emitError(args: Object): void;
    unsubscribe(channel: Object): void;
}
