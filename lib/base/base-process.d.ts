import { Job } from 'bull';
import { IBaseQueueProcess } from './base-process.interface';
export declare abstract class BaseQueueProcess<T> implements IBaseQueueProcess<T> {
    protected readonly logger: any;
    constructor(logger: any);
    onQueueCompleted(job: Job<T>, result: any): void;
    onQueueFailed(job: Job<T>, error: Error): void;
    onQueueRemoved(job: Job<T>): void;
    onQueueStalled(job: Job<T>): void;
    onQueueError(error: Error): void;
}
