import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Todo } from './interface/todo.interface';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('/todo')
  @HttpCode(200)
  async getAllTodos() {
    return await this.appService.getAllTodos();
  }
  @Get('/todo/:id')
  getSingleTodo(@Param() params): any {
    return this.appService.getSingleTodo(params.id);
  }
  @Delete('/todo/:id')
  async deleteTodo(@Param() params) {
    return await this.appService.deleteTodo(params.id);
  }
  @Post('/todo')
  addTodo(@Body() body) {
    return this.appService.addTodo(body);
  }

  @Put('/todo/:id')
  editTodo(@Body() body, @Param() params) {
    console.log('params:', params);
    return this.appService.editTodo(body, params.id);
  }

  @Patch('/todo/:id')
  completeTdo(@Param('id') id) {
    console.log('id:', id);
    return this.appService.completeTodo(id);
  }
}
