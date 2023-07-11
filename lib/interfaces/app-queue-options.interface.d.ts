import { BullModuleOptions, BullRootModuleOptions } from '@nestjs/bull';
import { Type } from '@nestjs/common';
export interface AppQueueOptions {
    bullConfig: BullRootModuleOptions;
    queues: BullModuleOptions[];
    bullBoard: BullBoardOptions;
}
export interface AppQueueOptionsFactory {
    createAppQueueOptions(): AppQueueOptions | Promise<AppQueueOptions>;
}
export interface BullBoardOptions {
    mode: 'on' | 'off';
    auth: {
        username: string;
        password: string;
    };
    path: string;
}
export interface AppQueueModuleAsyncOptions {
    useClass?: Type<AppQueueOptionsFactory>;
    injects?: any[];
}
