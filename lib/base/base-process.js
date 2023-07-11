"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseQueueProcess = void 0;
const bull_1 = require("@nestjs/bull");
class BaseQueueProcess {
    constructor(logger) {
        this.logger = logger;
    }
    onQueueCompleted(job, result) {
        this.logger.info({
            msg: `Job ${job.id} completed successfully`,
            log: result,
        });
    }
    onQueueFailed(job, error) {
        this.logger.error({
            msg: `Job ${job.id} failed with error: ${error.message}`,
        });
    }
    onQueueRemoved(job) {
        this.logger.info({ msg: `Job ${job.id} removed from the queue` });
    }
    onQueueStalled(job) {
        this.logger.error({ msg: `Job ${job.id} has stalled` });
    }
    onQueueError(error) {
        this.logger.error({
            msg: `An error occurred in the queue: ${error.message}`,
        });
    }
}
__decorate([
    (0, bull_1.OnQueueCompleted)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], BaseQueueProcess.prototype, "onQueueCompleted", null);
__decorate([
    (0, bull_1.OnQueueFailed)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Error]),
    __metadata("design:returntype", void 0)
], BaseQueueProcess.prototype, "onQueueFailed", null);
__decorate([
    (0, bull_1.OnQueueRemoved)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BaseQueueProcess.prototype, "onQueueRemoved", null);
__decorate([
    (0, bull_1.OnQueueStalled)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BaseQueueProcess.prototype, "onQueueStalled", null);
__decorate([
    (0, bull_1.OnQueueError)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Error]),
    __metadata("design:returntype", void 0)
], BaseQueueProcess.prototype, "onQueueError", null);
exports.BaseQueueProcess = BaseQueueProcess;
//# sourceMappingURL=base-process.js.map