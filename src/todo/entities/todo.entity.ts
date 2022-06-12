

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";


@Entity('todo')
export class TodoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 20,
        nullable: true
    })
    user_id: string;

    @Column({ length: 20 })
    title: string;
    
    @Column({ length: 1000 })
    content: string;

    @CreateDateColumn({
        name: "created_at"
    })
    createdDate: Date;

    @Column({ type: 'date' })
    startDate: Date;

    @Column({ type: 'date' })
    endDate: Date;
}