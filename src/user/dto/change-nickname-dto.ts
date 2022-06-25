import { IsNumber, IsString } from "class-validator";

export class changeNickNameDTO {
    
    @IsNumber()
    usercode: number;
    
    @IsString()
    nickname: string;
}