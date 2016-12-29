export declare class Mock {
    constructor(broadcaster: Object);
    initializeListener(instance: Object): void;
    addEventsBroadcast(channels: Object, triggerEvents: Object): void;
    removeEventBroadcast(channels: Object): void;
    enableEventsBroadcast(args: Object): void;
    disableEventsBroadcast(args: Object): void;
}
