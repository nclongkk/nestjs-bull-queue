import {
  OnQueueCompleted,
  OnQueueError,
  OnQueueFailed,
  OnQueueRemoved,
  OnQueueStalled,
} from '@nestjs/bull';
import { Job } from 'bull';
import { IBaseQueueProcess } from './base-process.interface';

export abstract class BaseQueueProcess<T> implements IBaseQueueProcess<T> {
  constructor(protected readonly logger: any) {}

  @OnQueueCompleted()
  onQueueCompleted(job: Job<T>, result: any) {
    this.logger.info({
      msg: `Job ${job.id} completed successfully`,
      log: result,
    });
  }

  @OnQueueFailed()
  onQueueFailed(job: Job<T>, error: Error) {
    this.logger.error({
      msg: `Job ${job.id} failed with error: ${error.message}`,
    });
  }

  @OnQueueRemoved()
  onQueueRemoved(job: Job<T>) {
    this.logger.info({ msg: `Job ${job.id} removed from the queue` });
  }

  @OnQueueStalled()
  onQueueStalled(job: Job<T>) {
    this.logger.error({ msg: `Job ${job.id} has stalled` });
  }

  @OnQueueError()
  onQueueError(error: Error) {
    this.logger.error({
      msg: `An error occurred in the queue: ${error.message}`,
    });
  }
}
