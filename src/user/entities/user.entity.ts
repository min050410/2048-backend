import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    usercode: number;

    @Column()
    id: string;

    @Column()
    nickname: string;

    @Column({
        type: 'int'
    })
    score: number;

    @Column({
        type: 'int'
    })
    scoreMaxNumber: number;
}