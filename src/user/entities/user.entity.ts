import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    usercode: number;

    @Column({
        nullable: false,
        length: 20
    })
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