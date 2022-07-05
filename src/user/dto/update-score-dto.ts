import { IsNumber, IsString } from "class-validator";

export class updateScoreDTO {
    
    @IsString()
    id: string;
    
    // 암호화
    @IsString()
    score: string;

    @IsString()
    scoreMaxNumber: string;
}