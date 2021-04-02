import { Controller } from '@server/application/decorators/Controller';
import { Delete, Get, Post, Put } from '@server/application/decorators/Route';
import { BaseController } from './BaseController';

@Controller("")
export class IndexController extends BaseController {
    @Get("/", { noAuth: true })
    public index() {
        return "Hello World";
    }
}
