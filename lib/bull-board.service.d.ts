import { INestApplication } from '@nestjs/common';
import { AppQueueOptions } from './interfaces/app-queue-options.interface';
import { AppQueueService } from './app-queue.service';
export declare class BullBoardConfig {
    private readonly options;
    private readonly appQueueService;
    constructor(options: AppQueueOptions, appQueueService: AppQueueService);
    setupBullBoard(app: INestApplication): void;
}
