import { IsNumberString , IsNotEmpty } from 'class-validator';

export class checkWeightDTO {
    @IsNotEmpty()
    @IsNumberString()
    squat: number;

    @IsNotEmpty()
    @IsNumberString()
    benchpress: number;

    @IsNotEmpty()
    @IsNumberString()
    deadlift: number;
}