import Bull, { Job, JobId, JobOptions, JobStatus } from 'bull';

export interface IBaseQueueService<T> {
  addJob(queueName: string, data: T, options?: JobOptions): Promise<Job<T>>;
  removeJobs(pattern: string): Promise<void>;
  getJob(jobId: JobId): Promise<Job<T> | null>;
  getJobs(
    types: JobStatus[],
    start?: number,
    end?: number,
    asc?: boolean,
  ): Promise<Array<Job<T>>>;
  getCompletedJobs(start?: number, end?: number): Promise<Job<any>[]>;
  getFailedJobs(start?: number, end?: number): Promise<Job<any>[]>;
  getDelayedJobs(start?: number, end?: number): Promise<Job<any>[]>;
  pause(isLocal?: boolean, doNotWaitActive?: boolean): Promise<void>;
  resume(isLocal?: boolean): Promise<void>;
  clean(
    grace: number,
    status?: Bull.JobStatusClean,
    limit?: number,
  ): Promise<void>;
}
