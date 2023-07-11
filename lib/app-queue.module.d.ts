import { DynamicModule } from '@nestjs/common';
import { AppQueueModuleAsyncOptions, AppQueueOptions } from './interfaces/app-queue-options.interface';
export declare class AppQueueModule {
    static registerAsync(options: AppQueueModuleAsyncOptions): Promise<DynamicModule>;
    static register(options: AppQueueOptions): DynamicModule;
    static createDynamicModule(options: AppQueueOptions): DynamicModule;
}
