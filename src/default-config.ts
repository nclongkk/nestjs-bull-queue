import { AppQueueOptions } from './interfaces';

export const getDefaultConfig = (): AppQueueOptions => {
  [
    'BULL_BOARD_MODE',
    'BULL_BOARD_USERNAME',
    'BULL_BOARD_PASSWORD',
    'BULL_BOARD_PATH',
    'REDIS_HOST',
    'REDIS_PORT',
  ].forEach((env) => {
    if (!process.env[env]) {
      throw new Error(`Environment variable ${env} is not defined`);
    }
  });

  return {
    bullBoard: {
      mode: process.env.BULL_BOARD_MODE as 'on' | 'off',
      auth: {
        username: process.env.BULL_BOARD_USERNAME,
        password: process.env.BULL_BOARD_PASSWORD,
      },
      path: process.env.BULL_BOARD_PATH,
    },
    bullConfig: {
      prefix: 'queue',
      defaultJobOptions: {
        removeOnComplete: {
          age: 86400, // 1 day
          count: 1000,
        },
        removeOnFail: false,
        delay: 0, // 0 sec wait until this job can be processed
        attempts: 5, // If job fails it will retry till 5 times
        backoff: 5000, // static 5 sec delay between retry
      },
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
        maxRetriesPerRequest: null,
        enableReadyCheck: false,
      },
    },
    queues: [],
  };
};
