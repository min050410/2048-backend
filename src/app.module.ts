import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoController } from './todo/todo.controller';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'mariadb',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [__dirname + '/**/entities/*.entity.{js,ts}']
  }),
    TodoModule
  ],
  controllers: [AppController, TodoController],
  providers: [AppService],
})
export class AppModule { }
