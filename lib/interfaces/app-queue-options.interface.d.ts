import { BullModuleOptions, BullRootModuleOptions } from '@nestjs/bull';
import { Type } from '@nestjs/common';
import { BULL_BOARD_MODE } from '../constants';
export interface AppQueueOptions {
    bullConfig: BullRootModuleOptions;
    queues: BullModuleOptions[];
    bullBoard: BullBoardOptions;
}
export interface AppQueueOptionsFactory {
    createAppQueueOptions(): AppQueueOptions | Promise<AppQueueOptions>;
}
export interface BullBoardOptions {
    mode: BULL_BOARD_MODE;
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
