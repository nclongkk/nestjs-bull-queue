import * as Bull from 'bull';
import { Queue, Job, JobId, JobOptions, JobStatus } from 'bull';
import { IBaseQueueService } from './base-queue.interface';

export class BaseQueueService<T> implements IBaseQueueService<T> {
  constructor(readonly queue: Queue) {}

  async addJob(
    queueName: string,
    data: T,
    options?: JobOptions,
  ): Promise<Job<T>> {
    const job = await this.queue.add(queueName, data, options);
    return job;
  }

  async removeJobs(pattern: string): Promise<void> {
    await this.queue.removeJobs(pattern);
  }

  async getJob(jobId: JobId): Promise<Job<T> | null> {
    const job = await this.queue.getJob(jobId);
    return job;
  }

  async getJobs(
    types: JobStatus[],
    start?: number,
    end?: number,
    asc?: boolean,
  ): Promise<Array<Job<T>>> {
    const jobs = await this.queue.getJobs(types, start, end, asc);
    return jobs;
  }

  async getCompletedJobs(start?: number, end?: number): Promise<Job<any>[]> {
    const jobs = await this.queue.getCompleted(start, end);
    return jobs;
  }

  async getFailedJobs(start?: number, end?: number): Promise<Job<any>[]> {
    const jobs = await this.queue.getFailed(start, end);
    return jobs;
  }

  async getDelayedJobs(start?: number, end?: number): Promise<Job<any>[]> {
    const jobs = await this.queue.getDelayed(start, end);
    return jobs;
  }

  async pause(isLocal?: boolean, doNotWaitActive?: boolean): Promise<void> {
    await this.queue.pause(isLocal, doNotWaitActive);
  }

  async resume(isLocal?: boolean): Promise<void> {
    await this.queue.resume(isLocal);
  }

  async clean(
    grace: number,
    status?: Bull.JobStatusClean,
    limit?: number,
  ): Promise<void> {
    await this.queue.clean(grace, status, limit);
  }
}
