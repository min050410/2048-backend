import { IsNumber, IsString } from "class-validator";

export class updateScoreDTO {
    
    @IsString()
    id: string;
    
    @IsString()
    score: string;

    @IsString()
    scoreMaxNumber: string;
}