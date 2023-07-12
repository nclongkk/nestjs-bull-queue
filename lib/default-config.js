"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultConfig = void 0;
const constants_1 = require("./constants");
const getDefaultConfig = () => {
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
            mode: process.env.BULL_BOARD_MODE === 'on'
                ? constants_1.BULL_BOARD_MODE.ON
                : constants_1.BULL_BOARD_MODE.OFF,
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
                    age: 86400,
                    count: 1000,
                },
                removeOnFail: false,
                delay: 0,
                attempts: 5,
                backoff: 5000,
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
exports.getDefaultConfig = getDefaultConfig;
//# sourceMappingURL=default-config.js.map