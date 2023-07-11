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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BullBoardConfig = void 0;
const common_1 = require("@nestjs/common");
const bullAdapter_1 = require("@bull-board/api/bullAdapter");
const expressBasicAuth = require("express-basic-auth");
const express_1 = require("@bull-board/express");
const api_1 = require("@bull-board/api");
const app_queue_service_1 = require("./app-queue.service");
const app_queue_constants_1 = require("./constants/app-queue.constants");
let BullBoardConfig = class BullBoardConfig {
    constructor(options, appQueueService) {
        this.options = options;
        this.appQueueService = appQueueService;
    }
    setupBullBoard(app) {
        if (this.options.bullBoard.mode === 'off') {
            return;
        }
        const queues = this.options.queues.map((queue) => this.appQueueService.getQueue(queue.name).queue);
        const queueAdapters = queues.map((queue) => new bullAdapter_1.BullAdapter(queue));
        const { auth: { username, password }, path, } = this.options.bullBoard;
        const staticUserAuth = expressBasicAuth({
            users: {
                [username]: password,
            },
            challenge: true,
        });
        const serverAdapter = new express_1.ExpressAdapter();
        serverAdapter.setBasePath(path);
        app.use(path, staticUserAuth, serverAdapter.getRouter());
        (0, api_1.createBullBoard)({ queues: queueAdapters, serverAdapter });
    }
};
BullBoardConfig = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(app_queue_constants_1.BULL_BOARD_OPTIONS_TOKEN)),
    __metadata("design:paramtypes", [Object, app_queue_service_1.AppQueueService])
], BullBoardConfig);
exports.BullBoardConfig = BullBoardConfig;
//# sourceMappingURL=bull-board.service.js.map