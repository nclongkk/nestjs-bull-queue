"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseQueueService = void 0;
class BaseQueueService {
    constructor(queue) {
        this.queue = queue;
    }
    addJob(queueName, data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const job = yield this.queue.add(queueName, data, options);
            return job;
        });
    }
    removeJobs(pattern) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.queue.removeJobs(pattern);
        });
    }
    getJob(jobId) {
        return __awaiter(this, void 0, void 0, function* () {
            const job = yield this.queue.getJob(jobId);
            return job;
        });
    }
    getJobs(types, start, end, asc) {
        return __awaiter(this, void 0, void 0, function* () {
            const jobs = yield this.queue.getJobs(types, start, end, asc);
            return jobs;
        });
    }
    getCompletedJobs(start, end) {
        return __awaiter(this, void 0, void 0, function* () {
            const jobs = yield this.queue.getCompleted(start, end);
            return jobs;
        });
    }
    getFailedJobs(start, end) {
        return __awaiter(this, void 0, void 0, function* () {
            const jobs = yield this.queue.getFailed(start, end);
            return jobs;
        });
    }
    getDelayedJobs(start, end) {
        return __awaiter(this, void 0, void 0, function* () {
            const jobs = yield this.queue.getDelayed(start, end);
            return jobs;
        });
    }
    pause(isLocal, doNotWaitActive) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.queue.pause(isLocal, doNotWaitActive);
        });
    }
    resume(isLocal) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.queue.resume(isLocal);
        });
    }
    clean(grace, status, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.queue.clean(grace, status, limit);
        });
    }
}
exports.BaseQueueService = BaseQueueService;
//# sourceMappingURL=base-queue.js.map