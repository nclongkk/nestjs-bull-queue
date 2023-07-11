"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var AppQueueModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppQueueModule = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const app_queue_service_1 = require("./app-queue.service");
const bull_board_service_1 = require("./bull-board.service");
const app_queue_constants_1 = require("./constants/app-queue.constants");
let AppQueueModule = AppQueueModule_1 = class AppQueueModule {
    static registerAsync(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const asyncOptions = yield new options.useClass(...options.injects.map((Inject) => new Inject())).createAppQueueOptions();
            return {
                module: AppQueueModule_1,
                imports: [
                    ...asyncOptions.queues.map((queue) => bull_1.BullModule.registerQueue(queue)),
                    bull_1.BullModule.forRoot(asyncOptions.bullConfig),
                ],
                providers: [
                    {
                        provide: app_queue_constants_1.BULL_BOARD_OPTIONS_TOKEN,
                        useValue: asyncOptions,
                    },
                    bull_board_service_1.BullBoardConfig,
                    app_queue_service_1.AppQueueService,
                ],
                exports: [app_queue_service_1.AppQueueService, bull_board_service_1.BullBoardConfig],
            };
        });
    }
    static register(options) {
        return {
            module: AppQueueModule_1,
            imports: [
                ...options.queues.map((queue) => bull_1.BullModule.registerQueue(queue)),
                bull_1.BullModule.forRoot(options.bullConfig),
            ],
            providers: [
                {
                    provide: 'BULL_BOARD_MODULE_OPTIONS',
                    useValue: options,
                },
                bull_board_service_1.BullBoardConfig,
                app_queue_service_1.AppQueueService,
            ],
            exports: [app_queue_service_1.AppQueueService, bull_board_service_1.BullBoardConfig],
        };
    }
};
AppQueueModule = AppQueueModule_1 = __decorate([
    (0, common_1.Global)()
], AppQueueModule);
exports.AppQueueModule = AppQueueModule;
//# sourceMappingURL=app-queue.module.js.map