import { Controller } from '@server/application/decorators/Controller';
import { Delete, Get, Post, Put } from '@server/application/decorators/Route';
import { BaseController } from './BaseController';
import { CurrencyService } from '@server/entity/currency/service/CurrencyService';
import { CurrencyType } from '@server/entity/currency/model/CurrencyType';
import { EventManager } from '@server/application/event/EventManager';

@Controller("")
export class IndexController extends BaseController {
    @Get("/", { noAuth: true })
    public index() {
        return "Hello World";
    }   
    
    @Get("/ticker", { noAuth: true })
    public getTicker() {
        return CurrencyService.getAllTickersAsync();
    }    
    
    @Get("/emit", { noAuth: true })
    public emit() {
        return EventManager.emit("SHOULD_REFRESH");
    }
}
