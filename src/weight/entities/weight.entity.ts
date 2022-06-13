import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity('weight')
export class WeightEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 20,
        nullable: true
    })
    user_id: string;

    @Column({ type: Number })
    squat: number;
    
    @Column({ type: Number })
    benchpress: number;

    @Column({ type: Number })
    deadlift: number;

    static from(
        squat: number,
        benchpress: number,
        deadlift: number,
    ) {
        const weight = new WeightEntity();
        weight.user_id = null;
        weight.squat = squat;
        weight.benchpress = benchpress;
        weight.deadlift = deadlift;
        return weight;
    }
}