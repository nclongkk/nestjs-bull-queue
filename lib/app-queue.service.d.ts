import { ModuleRef } from '@nestjs/core';
import { BaseQueueService } from './base/base-queue';
export declare class AppQueueService {
    private readonly moduleRef;
    constructor(moduleRef: ModuleRef);
    getQueue(queueName: string): BaseQueueService<unknown>;
}
