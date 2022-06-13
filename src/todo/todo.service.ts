import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { makeTodoDTO } from '../todo/dto/make-todo.dto';
import { TodoEntity } from '../todo/entities/todo.entity';

@Injectable()
export class TodoService {
    constructor(@InjectRepository(TodoEntity) private todorepository: Repository<TodoEntity>) 
    { }

    async createTodo(data: makeTodoDTO): Promise<void> {
        const entity = new TodoEntity;
        entity.content = data.content;
        entity.createdDate = new Date;
        entity.title = data.title;
        entity.startDate = data.startDate;
        entity.endDate = data.endDate;
        entity.user_id = null; // todo

        await this.todorepository.save(entity);
    }
}
