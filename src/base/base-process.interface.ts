import { Job } from 'bull';

export interface IBaseQueueProcess<T> {
  onQueueCompleted(job: Job<T>, result: any);
  onQueueFailed(job: Job<T>, error: Error): void;
  onQueueRemoved(job: Job<T>): void;
  onQueueStalled(job: Job<T>): void;
  onQueueError(error: Error): void;
}
