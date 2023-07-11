import { Injectable, Inject } from '@nestjs/common';
import { Queue } from 'bull';
import { getQueueToken } from '@nestjs/bull';
import { ModuleRef } from '@nestjs/core';
import { BaseQueueService } from './base/base-queue';

@Injectable()
export class AppQueueService {
  constructor(@Inject(ModuleRef) private readonly moduleRef: ModuleRef) {}

  getQueue(queueName: string) {
    const queue = this.moduleRef.get<Queue>(getQueueToken(queueName), {
      strict: false,
    });
    return new BaseQueueService(queue);
  }
}
