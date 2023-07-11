import { BullModule } from '@nestjs/bull';
import { DynamicModule, Global, Module } from '@nestjs/common';
import {
  AppQueueModuleAsyncOptions,
  AppQueueOptions,
} from './interfaces/app-queue-options.interface';
import { AppQueueService } from './app-queue.service';
import { BullBoardConfig } from './bull-board.service';
import { BULL_BOARD_OPTIONS_TOKEN } from './constants/app-queue.constants';

@Global()
export class AppQueueModule {
  static async registerAsync(
    options: AppQueueModuleAsyncOptions,
  ): Promise<DynamicModule> {
    const asyncOptions = await new options.useClass(
      ...options.injects.map((Inject) => new Inject()),
    ).createAppQueueOptions();

    return {
      module: AppQueueModule,
      imports: [
        ...asyncOptions.queues.map((queue) => BullModule.registerQueue(queue)),
        BullModule.forRoot(asyncOptions.bullConfig),
      ],
      providers: [
        {
          provide: BULL_BOARD_OPTIONS_TOKEN,
          useValue: asyncOptions,
        },
        BullBoardConfig,
        AppQueueService,
      ],
      exports: [AppQueueService, BullBoardConfig],
    };
  }

  static register(options: AppQueueOptions): DynamicModule {
    return {
      module: AppQueueModule,
      imports: [
        ...options.queues.map((queue) => BullModule.registerQueue(queue)),
        BullModule.forRoot(options.bullConfig),
      ],
      providers: [
        {
          provide: 'BULL_BOARD_MODULE_OPTIONS',
          useValue: options,
        },
        BullBoardConfig,
        AppQueueService,
      ],
      exports: [AppQueueService, BullBoardConfig],
    };
  }
}
