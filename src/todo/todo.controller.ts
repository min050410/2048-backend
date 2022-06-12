import { Body, Controller, Post } from '@nestjs/common';
import { makeTodoDTO } from './dto/make-todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
    constructor(private todoservice: TodoService) {}

    @Post('/make')
    async makeTodo(@Body() dto: makeTodoDTO): Promise<makeTodoDTO> {
        this.todoservice.createTodo(dto);
        return dto;
    }

}
