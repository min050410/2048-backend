import { IsNumber, IsString } from "class-validator";

export class updateScoreDTO {
    
    @IsNumber()
    usercode: number;
    
    @IsNumber()
    score: number;

    @IsNumber()
    scoreMaxNumber: number;
}