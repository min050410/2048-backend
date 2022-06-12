import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoEntity } from './entities/todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './todo.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TodoEntity]),
  ],
  controllers: [TodoController],
  providers: [TodoService]
})
export class TodoModule {}
