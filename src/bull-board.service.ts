import { INestApplication, Inject, Injectable } from '@nestjs/common';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import * as expressBasicAuth from 'express-basic-auth';
import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from '@bull-board/api';
import { AppQueueOptions } from './interfaces/app-queue-options.interface';
import { AppQueueService } from './app-queue.service';
import {
  BULL_BOARD_MODE,
  BULL_BOARD_OPTIONS_TOKEN,
} from './constants/app-queue.constants';

@Injectable()
export class BullBoardConfig {
  constructor(
    @Inject(BULL_BOARD_OPTIONS_TOKEN)
    private readonly options: AppQueueOptions,
    private readonly appQueueService: AppQueueService,
  ) {}

  setupBullBoard(app: INestApplication): void {
    if (this.options.bullBoard.mode !== BULL_BOARD_MODE.ON) {
      return;
    }

    const queues = this.options.queues.map(
      (queue) => this.appQueueService.getQueue(queue.name).queue,
    );
    const queueAdapters = queues.map((queue) => new BullAdapter(queue));

    const {
      auth: { username, password },
      path,
    } = this.options.bullBoard;
    const staticUserAuth = expressBasicAuth({
      users: {
        [username]: password,
      },
      challenge: true,
    });

    const serverAdapter = new ExpressAdapter();
    serverAdapter.setBasePath(path);
    app.use(path, staticUserAuth, serverAdapter.getRouter());
    createBullBoard({ queues: queueAdapters, serverAdapter });
  }
}
